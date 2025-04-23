import React, { useRef, useState } from "react";
import ReactModal from "react-modal";

import Tippy from "@tippyjs/react";
import Swal from "sweetalert2";
import SubscriptionsRest from "../../../Actions/SubscriptionsRest";
import Global from "../../../Utils/Global";
import HtmlContent from "../../../Utils/HtmlContent";
import { X } from "lucide-react";

const FooterPideloPe = ({ pages, generals }) => {
    const subscriptionsRest = new SubscriptionsRest();
    const emailRef = useRef();

    const [modalOpen, setModalOpen] = useState(null);
    const [saving, setSaving] = useState();

    const policyItems = {
        terms_conditions: "Términos y condiciones",
        privacy_policy: "Políticas de privacidad",
        // 'delivery_policy': 'Políticas de envío',
        saleback_policy: "Políticas de devolucion y cambio",
    };

    const openModal = (index) => setModalOpen(index);
    const closeModal = () => setModalOpen(null);

    const onEmailSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const request = {
            email: emailRef.current.value,
        };
        const result = await subscriptionsRest.save(request);
        setSaving(false);

        if (!result) return;

        Swal.fire({
            title: "¡Éxito!",
            text: `Te has suscrito correctamente al blog de ${Global.APP_NAME}.`,
            icon: "success",
            confirmButtonText: "Ok",
        });

        emailRef.current.value = null;
    };
    return (
        <footer className="bg-accent text-white py-12  text-sm font-font-secondary">
            <div className="px-primary mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Menu Columns */}
                <div className="grid grid-cols-3 col-span-3 gap-8  justify-between mr-6">
                    {/* Logo Column */}
                    <div>
                        <div className="h-14 aspect-[13/4] ">
                            <div
                                className="h-full w-full bg-white"
                                style={{
                                    maskImage: `url(/assets/resources/logo.png)`,
                                    maskSize: "contain",
                                    maskPosition: "center",
                                    maskRepeat: "no-repeat",
                                }}
                            />
                        </div>
                    </div>

                    {/* Menu Column */}
                    <div>
                        <h3 className="customtext-primary font-bold mb-6 text-base">
                            Menú
                        </h3>
                        <ul className="space-y-3 text-white">
                            {pages.map(
                                (page, index) =>
                                    page.menuable && ( // Simplified conditional rendering
                                        <li key={index}>
                                            <a
                                                href={page.path}
                                                className="hover:customtext-primary hover:font-semibold text-sm cursor-pointer transition-all duration-300  "
                                            >
                                                {page.name}
                                            </a>
                                        </li>
                                    )
                            )}
                        </ul>
                    </div>

                    {/* Policies Column */}
                    <div>
                        <h3 className="customtext-primary font-bold mb-6 text-base">
                            Políticas
                        </h3>
                        <ul className="space-y-3 text-white">
                            <li>
                                <a
                                    onClick={() => openModal(0)}
                                    className="cursor-pointer hover:customtext-primary hover:font-bold transition-all duration-300"
                                >
                                    Políticas de privacidad
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => openModal(1)}
                                    className="cursor-pointer hover:customtext-primary hover:font-bold transition-all duration-300"
                                >
                                    Términos y Conduiciones
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Column */}
                <div className="col-span-1">
                    <h3 className="customtext-primary font-bold mb-4 text-base ">
                        Métodos de Pago
                    </h3>
                    <div className="grid grid-cols-5 gap-2">
                        <img
                            src="/assets/img/save/master.png"
                            className="h-6 w-auto object-cover"
                        />
                        <img
                            src="/assets/img/save/bitpay.png"
                            className="h-6 w-auto object-cover"
                        />
                        <img
                            src="/assets/img/save/visa.png"
                            className="h-6 w-auto object-cover"
                        />
                        <img
                            src="/assets/img/save/amex.png"
                            className="h-6 w-auto object-cover"
                        />
                        <img
                            src="/assets/img/save/disco.png"
                            className="h-6 w-auto object-cover"
                        />
                        <img
                            src="/assets/img/save/sof.png"
                            className="h-6 w-auto object-cover"
                        />
                        <img
                            src="/assets/img/save/gpay.png"
                            className="h-6 w-auto object-cover"
                        />
                        <img
                            src="/assets/img/save/apple.png"
                            className="h-6 w-auto object-cover"
                        />
                        <img
                            src="/assets/img/save/paypal.png"
                            className="h-6 w-auto object-cover"
                        />
                        <img
                            src="/assets/img/save/maestro.png"
                            className="h-6 w-auto object-cover"
                        />
                    </div>
                </div>
            </div>
            {Object.keys(policyItems).map((key, index) => {
                const title = policyItems[key];
                const content =
                    generals.find((x) => x.correlative == key)?.description ??
                    "";
                return (
                    <ReactModal
                        key={index}
                        isOpen={modalOpen === index}
                        onRequestClose={closeModal}
                        contentLabel={title}
                        className="absolute left-1/2 -translate-x-1/2 bg-white p-6 rounded-xl shadow-lg w-[95%] max-w-4xl my-8"
                        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
                    >
                        <button
                            onClick={closeModal}
                            className="float-right text-red-500 hover:text-red-700 transition-all duration-300 "
                        >
                            <X width="2rem" strokeWidth="4px" />
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{title}</h2>
                        <HtmlContent className="prose" html={content} />
                    </ReactModal>
                );
            })}
        </footer>
    );
};
export default FooterPideloPe;
