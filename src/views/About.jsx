import React from 'react';
import useLocale from '../hooks/useLocale';
import useIcons from '../hooks/useIcons';
import Rating from '../components/Rating';

export default function About() {
	const locale = useLocale();
	const dateOfBirth = new Date(2003, 12, 16);
	const today = new Date();
	const age = today.getFullYear() - dateOfBirth.getFullYear();

	const { phone, email } = useIcons();

	return (
		<>
			{!locale._meta.loading && !locale._meta.error && (
				<>
					<h1>{locale.aboutMe}</h1>
					<h2>{locale.personalInformation}</h2>
					<span className="tag">{locale.location}</span>
					<span className="tag">
						{age} {locale.age}
					</span>

					<div className="block">
						<h3>Herkus Žilaitis</h3>

						<div className="phoneNumber">
							<span className="icon">{phone}</span>
							<span>+37063285735</span>
						</div>

						<div className="email">
							<span className="icon">{email}</span>
							<span>whisperer.meta@gmail.com</span>
						</div>
					</div>

					<span className="tag">{locale.bio}</span>
					<p className="paragraph">{locale.bioText}</p>

					<h2>{locale.education}</h2>
					<span className="tag">{locale.kaunasCollegeOfTechnology}</span>
					<div className="block">
						<h3>{locale.fieldOfStudy}</h3>
						<span>{locale.bachelorDegree}</span>
					</div>

					<span className="tag">
						{locale.kaunasSchoolOfInformationTechnologies}
					</span>
					<div className="block">
						<h3>{locale.fieldOfStudyHighSchool}</h3>
						<span>{locale.highSchoolDegree}</span>
					</div>

					<h2>{locale.languages}</h2>
					<ul className="languages">
						<li>
							<span className="tag">{locale.english}</span>
							<Rating rating={5} />
						</li>
						<li>
							<span className="tag">{locale.lithuanian}</span>
							<Rating rating={5} />
						</li>
						<li>
							<span className="tag">{locale.russian}</span>
							<Rating rating={1.5} />
						</li>
						<li>
							<span className="tag">{locale.dutch}</span>
							<Rating rating={2.5} />
						</li>
					</ul>
				</>
			)}
		</>
	);
}
