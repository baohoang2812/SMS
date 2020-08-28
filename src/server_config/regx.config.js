var regx = {
    validEmailRegex:
        RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i),
    validPhoneRegex:
        RegExp(/(?=^\d*\.?\d*$)^(\.?\d){10}$/)
}

export default regx;