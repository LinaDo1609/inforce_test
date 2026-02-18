import s from './ConfirmModal.module.scss'

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  message?: string
}

export const ConfirmModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, message}) => {
  if (!isOpen) return null

  return (
    <div className={s['confirm-modal']}>
      <div className={s['confirm-modal__overlay']} onClick={onClose}>
        <div className={s['confirm-modal__container']} onClick={e => e.stopPropagation()}>
          <p>{message}</p>
          
          <div className={s['confirm-modal__btns']}>
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
    
  )
}

