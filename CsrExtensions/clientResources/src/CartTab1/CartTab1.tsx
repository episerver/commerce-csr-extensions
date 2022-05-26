import axios from "axios";
import React, { useEffect, useState } from "react";
import { CartTab1Model } from "./CartTab1Model";
import "./global-style.scss";

const CartTab1: React.FC<{ groupOrderId: number }> = (props) => {
    const [model, setModel] = useState<CartTab1Model>({
        CartExpireDate: "",
        CartStatus: "",
        CartDiscount: 0,
        CustomerFullName: "",
        CustomerEmailAddress: "",
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    useEffect(() => {
        axios
            .get<CartTab1Model>(`/csr/api/extensions/carttab1/${props.groupOrderId}`)
            .then((result) => {
                const data = result.data;
                // check if object is not empty
                if ((Object.keys(data).length === 0 && data.constructor === Object) == false) {
                    setModel(data);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const onSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsSaving(true);
        axios
            .post(`/csr/api/extensions/carttab1/${props.groupOrderId}`, model)
            .then((result) => {
                const status = document.getElementsByClassName("saving-result")[0];
                if (result.status === 200) {
                    status.innerHTML = "Saved successfully.";
                } else {
                    status.innerHTML = "Failed to save.";
                }
                setIsSaving(false);
            })
            .finally(() => {
                setTimeout(() => {
                    const status = document.getElementsByClassName("saving-result")[0];
                    status.innerHTML = "";
                }, 2000);
            });
    };

    return (
        <>
            {!isLoading && (
                <div className="carttab1">
                    <h5>CartTab1</h5>
                    <form>
                        <div className="oui-date-picker meta-field">
                            <div className="oui-date-picker__input-row">
                                <div>
                                    <label htmlFor="CartExpireDate" className="oui-label">
                                        Cart Expire Date
                                    </label>
                                    <input
                                        id="CartExpireDate"
                                        name="CartExpireDate"
                                        className="oui-text-input oui-text-input--read-only"
                                        type="datetime-local"
                                        value={model.CartExpireDate.slice(0, -1)}
                                        onChange={(e) => {
                                            setModel({ ...model, CartExpireDate: e.target.value + "Z" });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="meta-field">
                            <label htmlFor="CartStatus" className="oui-form-field__item">
                                Cart Status
                            </label>
                            <input
                                id="CartStatus"
                                name="CartStatus"
                                className="oui-text-input"
                                type="text"
                                value={model.CartStatus}
                                onChange={(e) => {
                                    setModel({ ...model, CartStatus: e.target.value });
                                }}
                            />
                        </div>
                        <div className="meta-field">
                            <label htmlFor="CartDiscount" className="oui-form-field__item">
                                Cart Discount
                            </label>
                            <input
                                id="CartDiscount"
                                name="CartDiscount"
                                className="oui-text-input"
                                type="number"
                                value={model.CartDiscount}
                                onChange={(e) => {
                                    setModel({ ...model, CartDiscount: parseFloat(e.target.value) });
                                }}
                            />
                        </div>
                        <div className="meta-field">
                            <label htmlFor="CustomerFullName" className="oui-form-field__item">
                                Customer Full Name
                            </label>
                            <input
                                id="CustomerFullName"
                                name="CustomerFullName"
                                className="oui-text-input"
                                type="text"
                                value={model.CustomerFullName}
                                onChange={(e) => {
                                    setModel({ ...model, CustomerFullName: e.target.value });
                                }}
                            />
                        </div>
                        <div className="meta-field">
                            <label htmlFor="CustomerEmailAddress" className="oui-form-field__item">
                                Customer Email Address
                            </label>
                            <input
                                id="CustomerEmailAddress"
                                name="CustomerEmailAddress"
                                className="oui-text-input"
                                type="text"
                                value={model.CustomerEmailAddress}
                                onChange={(e) => {
                                    setModel({ ...model, CustomerEmailAddress: e.target.value });
                                }}
                            />
                        </div>
                        {isSaving ? (
                            <button
                                data-oui-component="true"
                                className="oui-button oui-button--highlight oui-button--default oui-button--loading"
                                disabled
                                onClick={onSave}
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fal"
                                    data-icon="spinner"
                                    className="svg-inline--fa fa-spinner axiom-icon axiom-icon--tiny fa-fw axiom-spinner fa-spin-pulse"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    color="hsla(227, 100%, 50%, 1)"
                                    data-test-section="button-spinner"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M256 0C229.5 0 208 21.49 208 48S229.5 96 256 96s48-21.49 48-48S282.5 0 256 0zM256 64C247.2 64 240 56.82 240 48S247.2 32 256 32s16 7.178 16 16S264.8 64 256 64zM256 416c-26.51 0-48 21.49-48 48S229.5 512 256 512s48-21.49 48-48S282.5 416 256 416zM256 480c-8.822 0-16-7.178-16-16S247.2 448 256 448s16 7.178 16 16S264.8 480 256 480zM464 208C437.5 208 416 229.5 416 256s21.49 48 48 48S512 282.5 512 256S490.5 208 464 208zM464 272C455.2 272 448 264.8 448 256s7.178-16 16-16S480 247.2 480 256S472.8 272 464 272zM96 256c0-26.51-21.49-48-48-48S0 229.5 0 256s21.49 48 48 48S96 282.5 96 256zM48 272C39.18 272 32 264.8 32 256s7.178-16 16-16S64 247.2 64 256S56.82 272 48 272zM403.1 355.1c-12.28 0-24.6 4.65-33.98 14.02c-18.74 18.74-18.74 49.14 0 67.88C378.5 446.4 390.8 451.1 403.1 451.1c12.29 0 24.53-4.723 33.91-14.09c18.75-18.75 18.75-49.14 0-67.88C427.6 359.8 415.4 355.1 403.1 355.1zM414.4 414.4c-4.078 4.078-8.838 4.688-11.31 4.688c-2.475 0-7.236-.6094-11.31-4.686c-6.24-6.24-6.24-16.39-.002-22.63c4.078-4.078 8.84-4.686 11.31-4.686c2.477 0 7.236 .6074 11.31 4.686C420.6 398 420.6 408.2 414.4 414.4zM108.9 60.89c-12.28 0-24.53 4.721-33.91 14.09c-18.74 18.74-18.74 49.14 0 67.88C84.35 152.2 96.6 156.9 108.9 156.9c12.29 0 24.6-4.652 33.98-14.02c18.75-18.75 18.75-49.14 0-67.88C133.5 65.61 121.2 60.89 108.9 60.89zM120.2 120.2C116.2 124.3 111.4 124.9 108.9 124.9c-2.475 0-7.236-.6094-11.31-4.686c-6.24-6.24-6.24-16.39-.002-22.63c4.078-4.078 8.84-4.686 11.31-4.686c2.477 0 7.236 .6074 11.31 4.686C126.5 103.8 126.5 113.1 120.2 120.2zM108.9 355.1c-12.28 0-24.53 4.65-33.91 14.02c-18.74 18.74-18.74 49.14 0 67.88C84.35 446.4 96.6 451.1 108.9 451.1c12.29 0 24.6-4.723 33.98-14.09c18.75-18.75 18.75-49.14 0-67.88C133.5 359.8 121.2 355.1 108.9 355.1zM120.2 414.4c-4.078 4.078-8.838 4.688-11.31 4.688c-2.475 0-7.236-.6094-11.31-4.686c-6.24-6.24-6.24-16.39-.002-22.63c4.078-4.078 8.84-4.686 11.31-4.686c2.477 0 7.236 .6074 11.31 4.686C126.5 398 126.5 408.2 120.2 414.4z"
                                    ></path>
                                </svg>
                                Processing
                            </button>
                        ) : (
                            <button className="oui-button oui-button--highlight oui-button--default" onClick={onSave}>
                                Save
                            </button>
                        )}
                        <span className="saving-result"></span>
                    </form>
                </div>
            )}
        </>
    );
};

export default CartTab1;
