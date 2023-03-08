import { Icon } from "./Icon";

export function DynamicModal({ children, isOpen, onCloseModal, ...restOfProps }) {

    return (
        <section className={`modal full main-layout ${isOpen ? 'open' : ''}`} {...restOfProps} >
            <div className="close-btn-container ">
                <button onClick={onCloseModal} className="flex auto-center"><Icon name="Close"/></button>
            </div>
            <div className="slot">
                {children}
            </div>
        </section>
    )
}