/* Yangpyeong-dong Church Accounting V7 cloud adapter.
 * Firebase Auth + Firestore realtime listeners + Storage receipt archive.
 */
(async function(){
 const C=window.YPDC_FIREBASE_CONFIG||{}; const configured=!!(C.apiKey&&C.authDomain&&C.projectId&&C.appId);
 const O={configured,ready:false,user:null,db:null,storage:null,auth:null,status:configured?'초기화중':'미연결',_fs:null,_au:null,_st:null,_unsub:[]};
 window.YPDCCloud=O;
 O.init=async function(){if(!configured){this.status='Firebase 설정 필요';return false;}try{
  const [{initializeApp},{getAuth,onAuthStateChanged},{getFirestore},{getStorage}]=await Promise.all([
   import('https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js'),import('https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js'),import('https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js'),import('https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js')]);
  const app=initializeApp(C);this.auth=getAuth(app);this.db=getFirestore(app);this.storage=getStorage(app);
  this._fs=await import('https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js');this._au=await import('https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js');this._st=await import('https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js');
  onAuthStateChanged(this.auth,u=>{this.user=u;this.status=u?'로그인':'로그아웃';this.stopRealtime();if(u)this.startRealtime();window.dispatchEvent(new CustomEvent('ypdc-auth',{detail:u}));});this.ready=true;this.status='로그인 필요';return true;
 }catch(e){console.error(e);this.status='연결오류';return false;}};
 O.churchId=()=>((window.db&&db.settings&&db.settings.church)||'양평동교회').replace(/[\\/#?\[\]]/g,'_');
 O.signIn=(email,password)=>{if(!O.ready)throw Error('Firebase 설정이 필요합니다.');return O._au.signInWithEmailAndPassword(O.auth,email,password)};
 O.signOut=()=>O._au.signOut(O.auth);
 O.startRealtime=function(){if(!this.user||!this.db)return;const base=this._fs.collection(this.db,'churches',this.churchId());
  this._unsub.push(this._fs.onSnapshot(this._fs.collection(base,'transactions'),snap=>{db.transactions=snap.docs.map(d=>d.data());save();renderAll();renderV5();v7Render();}));
  this._unsub.push(this._fs.onSnapshot(this._fs.collection(base,'accounts'),snap=>{db.accounts=snap.docs.map(d=>d.data());save();renderAll();}));
  this._unsub.push(this._fs.onSnapshot(this._fs.doc(base,'settings','main'),snap=>{if(snap.exists()){db.settings={...db.settings,...snap.data()};save();renderAll();}}));
 };
 O.stopRealtime=function(){this._unsub.forEach(f=>{try{f()}catch(e){}});this._unsub=[]};
 O.pushLocal=async function(){if(!this.user)throw Error('먼저 로그인하세요.');const base=this._fs.collection(this.db,'churches',this.churchId());
  await this._fs.setDoc(this._fs.doc(base,'settings','main'),db.settings,{merge:true});
  for(const list of [db.accounts,db.transactions]){for(let i=0;i<list.length;i+=400){const b=this._fs.writeBatch(this.db);list.slice(i,i+400).forEach(x=>{const col=list===db.accounts?'accounts':'transactions';b.set(this._fs.doc(base,col,x.id),x,{merge:true});});await b.commit();}}
  await this._fs.addDoc(this._fs.collection(base,'audit'),{at:new Date().toISOString(),uid:this.user.uid,action:'cloud-push',transactionCount:db.transactions.length});
 };
 O.pullCloud=async function(){if(!this.user)throw Error('먼저 로그인하세요.');const base=this._fs.collection(this.db,'churches',this.churchId());const [s,as,ts]=await Promise.all([this._fs.getDoc(this._fs.doc(base,'settings','main')),this._fs.getDocs(this._fs.collection(base,'accounts')),this._fs.getDocs(this._fs.collection(base,'transactions'))]);if(s.exists())db.settings={...db.settings,...s.data()};db.accounts=as.docs.map(x=>x.data());db.transactions=ts.docs.map(x=>x.data());save();};
 O.uploadReceipt=async function(receipt){if(!this.user)throw Error('먼저 로그인하세요.');if(!receipt||!receipt.data)return null;const path=`churches/${this.churchId()}/receipts/${receipt.id}.jpg`;const ref=this._st.ref(this.storage,path);const blob=await (await fetch(receipt.data)).blob();await this._st.uploadBytes(ref,blob,{contentType:blob.type||'image/jpeg',customMetadata:{transactionId:receipt.txId||'',uploadedBy:this.user.uid}});const url=await this._st.getDownloadURL(ref);return {path,url};};
 O.uploadAllReceipts=async function(){if(!this.user)throw Error('먼저 로그인하세요.');let n=0;for(const r of (db.receipts||[])){try{const x=await this.uploadReceipt(r);if(x){r.cloudPath=x.path;r.cloudUrl=x.url;n++;}}catch(e){console.warn('receipt',r.id,e)}}save();return n;};
 await O.init();window.dispatchEvent(new CustomEvent('ypdc-cloud-ready',{detail:O}));
})();
