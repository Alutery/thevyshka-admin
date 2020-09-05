import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';

import {userLoginFetch} from '../../../actions/auth-actions';

import './login.scss';
import FormButton from '../../form-button/form-button';

const LoginForm = ({userLoginFetch}) => {
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email('Email is invalid')
                    .required(),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required(),
            })}
            onSubmit={(fields, {setSubmitting}) => {
                userLoginFetch(fields, () => setSubmitting(false));
            }}
        >
            {({
                  errors,
                  isSubmitting,
                  touched,
                  values,
                  handleChange,
                  handleSubmit,
              }) => (
                <form id="login" className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={values.email}
                        onChange={handleChange}
                        className={'login-form__input' + (errors.email && touched.email ? ' is-invalid' : '')}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={values.password}
                        onChange={handleChange}
                        className={'login-form__input' + (errors.password && touched.password ? ' is-invalid' : '')}
                    />
                    <FormButton disabled={isSubmitting} text={'Войти'}/>
                </form>
            )}
        </Formik>
    );
};

const mapDispatchToProps = dispatch => ({
    userLoginFetch: (user, onError) => dispatch(userLoginFetch(user, onError)),
});

export default connect(null, mapDispatchToProps)(LoginForm);