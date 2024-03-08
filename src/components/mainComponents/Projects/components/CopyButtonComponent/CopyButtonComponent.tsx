import { getDataFromServer } from 'helper/getDataFromServer'
import React from 'react'
import { setErrorState } from 'redux/errorReducer'
import { useAppDispatch } from 'redux/hooks'

type Props = {
    correlationId: string
}

const CopyButtonComponent = ({ correlationId }: Props) => {
    const dispatch = useAppDispatch()

    function removeTags(html: string) {
        return html.replace(/<[^>]*>?/gm, '')
    }

    async function getData(correlationId: string) {
        try {
            const result = await getDataFromServer(
                `/api/job-advertisements/external-job-advertisements/current/${correlationId}`
            )
            dispatch(setErrorState(false))

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

    return (
        <button
            className="copy-btn project-item-btn"
            onClick={() => getData(correlationId)}
        >
            Копіювати
        </button>
    )
}

export default CopyButtonComponent
