var testForm = document.getElementById("form1");
if (testForm) {
    window.formComponent = {
        form: document.getElementById("form1"),
        validationFields: () => {
            // console.log(document.querySelectorAll("#form1 [data-validate]"));
            return document.querySelectorAll("#form1 [data-validate]");
        },
        nextStepBtns: document
            .getElementById("form1")
            .querySelectorAll(".formNextStep"),

        // if(validationFields.length < 1) return;

        init: () => {
            // console.log(validationFields.length);
            // form.classList.add('_validation-start');

            formComponent.validationOnSubmit();
            formComponent.validationOnNextStep();
            formComponent.validateOnEntry();
        },

        validationOnNextStep: () => {
            formComponent.nextStepBtns.forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    e.preventDefault();
                    formComponent.modelValidation();
                });
            });
        },

        modelValidation: (goToNextPage = true) => {
            formComponent.validationFields().forEach((field) => {
                formComponent.validateFields(field);
            });
            const checks = formComponent.form.querySelectorAll(
                ".error:not(.hidden):not(.date-error)"
            );
            if (
                window.userType !== "client" &&
                goToNextPage &&
                !checks.length
            ) {
                nextPage();
            }
        },

        validationOnSubmit: () => {
            formComponent.form.addEventListener("submit", (e) => {
                formComponent.modelValidation();
                const date = document.querySelector("#date");
                if (date && !date.value) {
                    const dateErrElement = document.querySelector(
                        ".date-error"
                    );
                    if (dateErrElement) {
                        dateErrElement.classList.remove("hidden");
                    }
                }

                const checks = formComponent.form.querySelectorAll(
                    ".error:not(.hidden)"
                );

                if (!!checks.length) {
                    e.preventDefault();
                }
            });
        },

        validateOnEntry: () => {
            formComponent.validationFields().forEach((field) => {
                field.addEventListener("input", (event) => {
                    formComponent.validateFields(field);
                });
            });
        },

        validateFields: (input) => {
            const data = input.dataset.validate;

            if (~data.indexOf("no-empty")) {
                if (input.value.trim() === "") {
                    formComponent.setStatus(input, "error");
                } else {
                    formComponent.setStatus(input, "success");
                }
            }

            if (~data.indexOf("email")) {
                const emailReg = /\S+@\S+\.\S+/;
                if (emailReg.test(input.value) && input.value.trim() !== "") {
                    formComponent.setStatus(input, "success");
                } else {
                    formComponent.setStatus(input, "error");
                }
            }

            if (~data.indexOf("select")) {
                if (input.value === "") {
                    formComponent.setStatus(input, "error");
                } else {
                    formComponent.setStatus(input, "success");
                }
            }
            if (~data.indexOf("checkbox")) {
                // console.log(input.checked);
                if (input.checked) {
                    formComponent.setStatus(input, "success");
                } else {
                    formComponent.setStatus(input, "error");
                }
            }

            if (~data.indexOf("phone")) {
                const phoneReg = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
                if (phoneReg.test(input.value) && input.value.trim() !== "") {
                    formComponent.setStatus(input, "success");
                } else {
                    formComponent.setStatus(input, "error");
                }
            }
        },

        // set/remove class final fx
        setStatus: (field, status) => {
            const errorMessage =
                field.parentNode.querySelector(".error") ||
                field.closest(".form__field").querySelector(".error");

            // console.log(errorMessage);
            if (status === "success") {
                field.classList.remove("input-error");
                errorMessage.classList.add("hidden");
            }
            if (status === "error") {
                field.classList.add("input-error");
                errorMessage.classList.remove("hidden");
            }
        },
    };

    formComponent.init();
}

//form data when select store
// (function formData() {
//     document.addEventListener("DOMContentLoaded", function () {
//         let select = document.getElementById("store_id");
//         if (typeof storesLine !== "undefined" && select) {
//             select.addEventListener("change", function () {
//                 document
//                     .getElementById("js-business-form-inner")
//                     .classList.remove("invisible");

//                 /**
//                  * @type {HTMLInputElement[]}
//                  */
//                 const inputsToReset = document.querySelectorAll(
//                     ".reset-on-change-store"
//                 );
//                 inputsToReset.forEach((inputToReset) => {
//                     inputToReset.value = null;
//                     inputToReset.parentNode.classList.remove(
//                         "form__field_active"
//                     );
//                 });

//                 if (select.value !== newStoreId) {
//                     storesLine.forEach((store) => {
//                         if (store.id === select.value) {
//                             for (fieldName in store) {
//                                 let elem = document.getElementById(fieldName);
//                                 if (elem && store.hasOwnProperty(fieldName)) {
//                                     elem.value = store[fieldName];
//                                     elem.parentNode.classList.add(
//                                         "form__field_active"
//                                     );
//                                 }
//                             }
//                         }
//                     });
//                     formComponent.modelValidation(false);
//                     document.getElementById("store_name").dataset.validate = "";
//                     document
//                         .getElementById("store_name")
//                         .classList.remove("input-error");
//                     document
//                         .querySelector("#store_name ~ .error")
//                         .classList.add("hidden");
//                     document
//                         .getElementById("store-text-wrapper")
//                         .classList.add("hidden");
//                 } else {
//                     // select.closest('.form__line').classList.add('hidden');
//                     document.getElementById("store_name").dataset.validate =
//                         "no-empty";
//                     document
//                         .getElementById("store-text-wrapper")
//                         .classList.remove("hidden");
//                 }
//             });
//         }
//     });
// })();

(function focusInput() {
    function focus() {
        if (this.value == "") {
            this.parentNode.classList.add("form__field_active");
        }
    }

    function blur() {
        if (this.value === "") {
            this.parentNode.classList.remove("form__field_active");
        }
    }

    var inputs = document.getElementsByClassName("form__input");

    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];

        input.addEventListener("focus", focus);
        input.addEventListener("blur", blur);
    }
})();
