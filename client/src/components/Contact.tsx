import { useState } from "react";
import { Link } from "react-router-dom";
import { IListing } from "../@types/listingType";
import { useGetUserQuery } from "../store/api/userApi";

interface ContactProps {
	listing: IListing;
}

const Contact: React.FC<ContactProps> = ({ listing }) => {
	const { data: landlord } = useGetUserQuery(listing.userRef);
	const [message, setMessage] = useState("");

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
	};

	return (
		<>
			<h1>Contact</h1>
			{landlord && (
				<div className="flex flex-col gap-2">
					<p>
						Contact <span className="font-semibold">{landlord.username}</span>{" "}
						for{" "}
						<span className="font-semibold">{listing.name.toLowerCase()}</span>
					</p>
					<textarea
						name="message"
						id="message"
						rows={2}
						value={message}
						onChange={onChange}
						placeholder="Enter your message here..."
						className="w-full border p-3 rounded-lg"
					></textarea>

					<Link
						to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
						className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
					>
						Send Message
					</Link>
				</div>
			)}
		</>
	);
};

export default Contact;
