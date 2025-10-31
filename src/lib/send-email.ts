import { Resend } from 'resend';

export const sendEmail = async (to: string, subject: string, html: string) => {
	try {
		const resend = new Resend(process.env.RESEND_API_KEY);

		const { data, error } = await resend.emails.send({
			from: 'Next Pizza <onboarding@resend.dev>',
			to: [to],
			subject,
			html,
		});

		if (error) {
			console.error('Resend error:', error);
			throw error;
		}

		console.log('Email sent successfully:', data);
		return data;
	} catch (error) {
		console.error('Error sending email:', error);
		throw error;
	}
};
