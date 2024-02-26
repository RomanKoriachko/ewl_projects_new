import { getDataFromServer } from 'helper/getDataFromServer'
import React from 'react'
import { setErrorState } from 'redux/errorReducer'
import { useAppDispatch } from 'redux/hooks'

type Props = {
    correlationId: string
}

const CopyButtonComponent = ({ correlationId }: Props) => {
    // const StatusNodeMap: Record<ICopyStatus, React.ReactNode> = {
    //     waiting: 'Копіювати',
    //     copying: 'Копіюю..',
    //     failed: 'Помилка!',
    //     succeed: 'Скопійовано!',
    // }

    const dispatch = useAppDispatch()

    function removeTags(html: string) {
        return html.replace(/<[^>]*>?/gm, '')
    }

    // const [currentprojectData, setCurrentProjectData] =
    //     useState<CurrentProjectType>()

    async function getData(correlationId: string) {
        try {
            const result = await getDataFromServer(
                `https://platform-prod.ewl.com.pl/job-advertisements/external-job-advertisements/current/${correlationId}`
            )
            dispatch(setErrorState(false))
            // setCurrentProjectData(result)

            // Копіюємо дані в буфер обміну
            if (result) {
                navigator.clipboard.writeText(
                    `${removeTags(result.companyName)}\n\n${removeTags(
                        result.description
                    )}\n\nОбов'язки\n${removeTags(
                        result.contractActivity
                    )}\n\nНеобхідна кваліфікація\n${removeTags(
                        result.requirements
                    )}\n\nБонуси\n${removeTags(result.benefits)}`
                )
                alert('Дані скопійовано в буфер обміну!')
            }
        } catch (error) {
            dispatch(setErrorState(true))
            console.error('Error:', error)
        }
    }

    // console.log(currentprojectData)

    return (
        <button
            className="copy-btn project-item-btn"
            onClick={() => getData(correlationId)}
        >
            Копіювати
        </button>
        // <CopyButton
        //     statusNodeMap={StatusNodeMap}
        //     className="copy-btn project-item-btn"
        //     value={`${removeTags(title)}\n\n${removeTags(
        //         description
        //     )}\n\nОбов'язки\n${removeTags(
        //         activity
        //     )}\n\nНеобхідна кваліфікація\n${removeTags(
        //         requirements
        //     )}\n\nБонуси\n${removeTags(benefits)}`}
        // />
    )
}

export default CopyButtonComponent
