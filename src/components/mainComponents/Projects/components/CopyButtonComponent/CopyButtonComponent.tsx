import CopyButton, { ICopyStatus } from '@yozora/react-common-copy-button'
import React from 'react'

type Props = {
    newAdvertisementHtml: string
}

const CopyButtonComponent = ({ newAdvertisementHtml }: Props) => {
    const StatusNodeMap: Record<ICopyStatus, React.ReactNode> = {
        waiting: 'Копіювати',
        copying: 'Копіюю..',
        failed: 'Помилка!',
        succeed: 'Скопійовано!',
    }

    function removeTags(html: string) {
        return html.replace(/<[^>]*>?/gm, '')
    }

    return (
        <CopyButton
            statusNodeMap={StatusNodeMap}
            className="copy-btn project-item-btn"
            value={removeTags(newAdvertisementHtml)}
        />
    )
}

export default CopyButtonComponent
