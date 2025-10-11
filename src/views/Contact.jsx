import React from 'react';
import useLocale from '../hooks/useLocale';
import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
	const [state, handleSubmit] = useForm('xkgqqkae');
	const locale = useLocale();

	return (
		<>
			{!locale._meta.loading && !locale._meta.error && (
				<>
					<h1>{locale.contact}</h1>
					<p>{locale.contactDescription}</p>

					<form onSubmit={handleSubmit}>
						<h3>{locale.formTitle}</h3>
						<span>{locale.formDescription}</span>

						<div className="formRow">
							<div className="formGroup">
								<label htmlFor="firstName">{locale.firstName}</label>
								<input type="text" id="firstName" name="firstName" required />
							</div>

							<div className="formGroup">
								<label htmlFor="lastName">{locale.lastName}</label>
								<input type="text" id="lastName" name="lastName" required />
							</div>
						</div>

						<div className="formGroup">
							<label htmlFor="email">{locale.email}</label>
							<input type="email" id="email" name="email" required />
							<ValidationError
								prefix="Email"
								field="email"
								errors={state.errors}
							/>
						</div>

						<div className="formGroup">
							<label htmlFor="message">{locale.message}</label>
							<textarea
								id="message"
								name="message"
								rows="6"
								required></textarea>
							<ValidationError
								prefix="Message"
								field="message"
								errors={state.errors}
							/>
						</div>

						{state.succeeded ? (
							<span className="formSuccessMessage">{locale.contactSuccess}</span>
						) : (
							<button type="submit" className="btnSubmit">
								{locale.submit}
							</button>
						)}
					</form>
				</>
			)}
		</>
	);
}
