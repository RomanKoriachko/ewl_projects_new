import CopyButton, { ICopyStatus } from '@yozora/react-common-copy-button'
import React from 'react'

type Props = {
    title: string
    description: string
    activity: string
    requirements: string
    benefits: string
}

const CopyButtonComponent = ({
    title,
    description,
    activity,
    requirements,
    benefits,
}: Props) => {
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
            value={`${removeTags(title)}\n\n${removeTags(
                description
            )}\n\nОбов'язки\n${removeTags(
                activity
            )}\n\nНеобхідна кваліфікація\n${removeTags(
                requirements
            )}\n\nБонуси\n${removeTags(benefits)}`}
        />
    )
}

export default CopyButtonComponent
