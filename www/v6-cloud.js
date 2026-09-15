/* 양평동교회 회계 V6 - Firebase Cloud adapter
 * Uses Firebase Web SDK v12 modular CDN. The app remains usable locally until configured.
 */
(async function(){
  const C=window.YPDC_FIREBASE_CONFIG||{};
  const configured=!!(C.apiKey&&C.authDomain&&C.projectId&&C.appId);
  window.YPDCCloud={configured,ready:false,user:null,db:null,storage:null,auth:null,
    async init(){
      if(!configured){this.status='미연결'; return false;}
      try{
        const [{initializeApp},{getAuth,onAuthStateChanged},{getFirestore},{getStorage}]=await Promise.all([
          import('https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js'),
          import('https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js'),
          import('https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js'),
          import('https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js')
        ]);
        const app=initializeApp(C); this.auth=getAuth(app); this.db=getFirestore(app); this.storage=getStorage(app);
        onAuthStateChanged(this.auth,u=>{this.user=u; this.status=u?'로그인':'로그아웃'; window.dispatchEvent(new CustomEvent('ypdc-auth',{detail:u}));});
        this._fs=await import('https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js');
        this._au=await import('https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js');
        this._st=await import('https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js');
        this.ready=true; this.status='로그인 필요'; return true;
      }catch(e){console.error(e);this.status='연결오류';return false;}
    },
    async signIn(email,password){if(!this.ready)throw Error('Firebase 설정이 필요합니다.');return this._au.signInWithEmailAndPassword(this.auth,email,password)},
    async signOut(){return this._au.signOut(this.auth)},
    async pushLocal(){
      if(!this.user)throw Error('먼저 로그인하세요.');
      const churchId=(window.db&&db.settings&&db.settings.church)||'양평동교회';
      const base=this._fs.collection(this.db,'churches',churchId);
      const batch=this._fs.writeBatch(this.db);
      batch.set(this._fs.doc(base,'settings','main'),db.settings,{merge:true});
      for(const a of db.accounts)batch.set(this._fs.doc(base,'accounts',a.id),a,{merge:true});
      for(const t of db.transactions)batch.set(this._fs.doc(base,'transactions',t.id),t,{merge:true});
      await batch.commit();
      await this._fs.setDoc(this._fs.doc(this.db,'churches',churchId,'audit',crypto.randomUUID()),{at:new Date().toISOString(),uid:this.user.uid,action:'cloud-push',count:db.transactions.length});
      return true;
    },
    async pullCloud(){
      if(!this.user)throw Error('먼저 로그인하세요.');
      const churchId=(window.db&&db.settings&&db.settings.church)||'양평동교회';
      const base=this._fs.collection(this.db,'churches',churchId);
      const [s,as,ts]=await Promise.all([
        this._fs.getDoc(this._fs.doc(base,'settings','main')),
        this._fs.getDocs(this._fs.collection(base,'accounts')),
        this._fs.getDocs(this._fs.collection(base,'transactions'))
      ]);
      if(s.exists())db.settings={...db.settings,...s.data()};
      db.accounts=as.docs.map(x=>x.data()); db.transactions=ts.docs.map(x=>x.data());
      if(typeof save==='function')save();
      return true;
    }
  };
  await YPDCCloud.init();
  window.dispatchEvent(new CustomEvent('ypdc-cloud-ready',{detail:YPDCCloud}));
})();
