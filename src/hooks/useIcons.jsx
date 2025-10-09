import React from 'react';

//#region Import Icons
import {
	FaHouse,
	FaBriefcase,
	FaBoxOpen,
	FaUser,
	FaEnvelopeOpenText,
	FaGithub,
	FaLinkedin,
	FaInstagram,
	FaSquareXTwitter,
	FaSquareJs,
	FaCss3,
	FaHtml5,
	FaNodeJs,
	FaPhp,
	FaReact,
	FaAtom,
	FaPhone,
	FaEnvelope,
	FaGitAlt,
	FaBootstrap,
	FaArrowUpRightFromSquare,
	FaClipboard,
	FaClipboardCheck,
} from 'react-icons/fa6';

import { MdLightMode, MdDarkMode, MdGTranslate } from 'react-icons/md';
import { IoLogoFirebase } from 'react-icons/io5';

//#endregion

export default function useIcons() {
	return {
		house: <FaHouse />,
		briefcase: <FaBriefcase />,
		projects: <FaBoxOpen />,
		about: <FaUser />,
		contact: <FaEnvelopeOpenText />,
		github: <FaGithub />,
		linkedin: <FaLinkedin />,
		instagram: <FaInstagram />,
		twitter: <FaSquareXTwitter />,
		lightMode: <MdLightMode />,
		darkMode: <MdDarkMode />,
        translate: <MdGTranslate />,
        js: <FaSquareJs />,
		css: <FaCss3 />,
		html: <FaHtml5 />,
		node: <FaNodeJs />,
		php: <FaPhp />,
		react: <FaReact />,
        electron: <FaAtom />,
        firebase: <IoLogoFirebase />,
        phone: <FaPhone />,
        email: <FaEnvelope />,
        git: <FaGitAlt />,
        bootstrap: <FaBootstrap />,
        externalLink: <FaArrowUpRightFromSquare />,
        clipboard: <FaClipboard />,
        clipboardCheck: <FaClipboardCheck />,
	};
}
