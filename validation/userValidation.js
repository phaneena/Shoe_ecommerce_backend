exports.passwordValidator=[
    {
        validator:function(password){
            return password.length>=8
        },
        message:'password must be atleast 8 letters'
    },
    {
        validator:function(password){
            return /[A-Z]/.test(password)
        },
        message:"password must contain atleast one uppercase letter"
    },
    {
        validator:function(password){
            return /[0-9]/.test(password)
        },
        message:"password must contain one number"
    }
]