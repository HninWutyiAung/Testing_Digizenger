export const handleSubmit = async (e, activeForm, email, phone, password, loginUser, dispatch, navigate) => {
    e.preventDefault();
    
    if (activeForm === 'form1' && (!email || !password)) {
      console.error("Email and Password are required for Form 1");
      return;
    }
    
    if (activeForm === 'form2' && (!phone || !password)) {
      console.error("Phone and Password are required for Form 2");
      return;
    }
  
    const credentials = {
      emailOrPhone: activeForm === 'form1' ? email : phone,
      password,
    };
  
    try {
      const response = await loginUser(credentials).unwrap();
      console.log("Login Successful", response);
    } catch (err) {
      console.error("Login Failed", err);
    }
  };

  export const RECAPTCHA_SITE_KEY = "6LdJnUEqAAAAAOBrwZRBiDZw_yKwqNSsKW7EU7Pt"; 