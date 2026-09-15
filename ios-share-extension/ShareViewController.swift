import UIKit
import Social
import UniformTypeIdentifiers

final class ShareViewController: UIViewController {
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        guard let item = extensionContext?.inputItems.first as? NSExtensionItem,
              let provider = item.attachments?.first else { finish(); return }
        let type = UTType.image.identifier
        if provider.hasItemConformingToTypeIdentifier(type) {
            provider.loadItem(forTypeIdentifier: type, options: nil) { item, _ in
                // TODO: App Group 컨테이너에 이미지를 저장하고 메인 앱에서 읽도록 연결
                DispatchQueue.main.async { self.finish() }
            }
        } else { finish() }
    }
    private func finish() { extensionContext?.completeRequest(returningItems: nil) }
}
