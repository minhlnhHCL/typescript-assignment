import { createPortal } from "react-dom";
type Props = {
    children: JSX.Element
}

const PortalContainer = ({ children }: Props) => {
    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) return;
    return createPortal(
        children, modalRoot);
}

export default PortalContainer