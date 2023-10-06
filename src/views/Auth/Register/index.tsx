import { useState } from 'react';
import styles from './Register.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'

const RegisterView = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const {push} = useRouter();
  const handlesubmit = async (event:any) => {
    event.preventDefault();
    setError("");
    setIsloading(true);
    const data = {
      email: event.target.email.value,
      fullname: event.target.fullname.value,
      password: event.target.password.value
    }
    const result = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (result.status === 200) {
      event.target.reset();
      setIsloading(false);
      push('/auth/login');
    } else {
      setIsloading(false);
      setError(result.status === 400 ? "Email already exist" : "")
    }
  }
    return (
        <div className={styles.register}>
            <h1 className={styles.register__title}> Register </h1>
            {error && <p className={styles.register__error}>{error}</p> }
          <div className={styles.register__form}>
            <form onSubmit={handlesubmit}>
               <div className={styles.register__form__item}>
               <label htmlFor="email" className={styles.register__form__item__label}>
                    Email
                </label>
                <input type="email" id='email' name='email' placeholder='email' className={styles.register__form__item__input} />
               </div>
               <div className={styles.register__form__item}>
               <label htmlFor="fullname" className={styles.register__form__item__label}>
                    Full Name
                </label>
                <input type="text" id='fullname' name='fullname' placeholder='fullname' className={styles.register__form__item__input} />
               </div>
               <div className={styles.register__form__item}>
               <label htmlFor="password" className={styles.register__form__item__label}>
                    Password
                </label>
                <input type="password" id='password' name='password' placeholder='password' className={styles.register__form__item__input} />
               </div>

               <button type='submit' className={styles.register__form__item__button} disabled={isLoading}>{isLoading ? "Loading..." : "Register"}</button>
            </form>
          </div>
          <p className={styles.register__link}>Have an Account? Sign in <Link href={"/auth/login"}>here</Link></p>
        </div>
    )
}

export default RegisterView