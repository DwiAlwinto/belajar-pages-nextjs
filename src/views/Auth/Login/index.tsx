import { useState } from 'react';
import styles from './Login.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn } from "next-auth/react";


const LoginView = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const {push, query} = useRouter();

 const callbackUrl: any = query.callbackUrl || '/';


  const handlesubmit = async (event:any) => {
    event.preventDefault();
    setError("");
    setIsloading(true);
   
    try {
        const res = await signIn ("credentials", {
            redirect: false,
            email : event.target.email.value,
            password : event.target.password.value,
            callbackUrl,
        });
        if (!res?.error) { //kalau tidak ada error
            setIsloading(false);
            push(callbackUrl);
        } else {
            setIsloading(false);
            setError("Email atau Password Salah");
        }

    } catch (error : any) {
        setIsloading(false);
        setError("Email atau Password Salah");
    }
  }
    return (
        <div className={styles.login}>
            <h1 className={styles.login__title}> Login </h1>
            {error && <p className={styles.login__error}>{error}</p> }
          <div className={styles.login__form}>
            
            <form onSubmit={handlesubmit}>
               <div className={styles.login__form__item}>
               <label htmlFor="email" className={styles.login__form__item__label}>
                    Email
                </label>
                <input type="email" id='email' name='email' placeholder='email' className={styles.login__form__item__input} />
               </div>
        
               <div className={styles.login__form__item}>
               <label htmlFor="password" className={styles.login__form__item__label}>
                    Password
                </label>
                <input type="password" id='password' name='password' placeholder='password' className={styles.login__form__item__input} />
               </div>

               <button type='submit' className={styles.login__form__item__button} disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</button>
               
            </form>
            <button onClick={() => signIn("google", {
                callbackUrl,
                redirect: false
               })} className={styles.login__form__item__google}>Sign In With Google</button>
          </div>
          <p className={styles.login__link}>    Don{"'"}t Have an Account? Sign up <Link href={"/auth/register"}>here</Link></p>
        </div>
    )
}

export default LoginView