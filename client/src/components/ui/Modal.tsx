// client/src/components/ui/Modal.tsx

interface ModalProps {
  onClose: () => void;
  videoKey: string;
}

const Modal = ({ onClose, videoKey }: ModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <iframe
          className="modal-iframe"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Modal;
