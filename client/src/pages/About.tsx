const About = () => {
	return (
		<div className="bg-gray-100 py-10 px-6 max-w-screen-xl mx-auto">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-slate-800 mb-4">
					Welcome to Real Estate
				</h1>
				<p className="text-lg text-slate-700 mb-8">
					Your Trusted Partner in Real Estate
				</p>
			</div>

			<div className="flex flex-wrap justify-center">
				<div className="w-full sm:w-1/2 md:w-1/3 p-4">
					<h2 className="text-2xl font-semibold text-slate-800 mb-2">Buy</h2>
					<p className="text-slate-700">
						Find your dream home with our expert guidance and extensive property
						listings.
					</p>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 p-4">
					<h2 className="text-2xl font-semibold text-slate-800 mb-2">Sell</h2>
					<p className="text-slate-700">
						Let us help you sell your property quickly and at the best possible
						price.
					</p>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 p-4">
					<h2 className="text-2xl font-semibold text-slate-800 mb-2">Rent</h2>
					<p className="text-slate-700">
						Discover the perfect rental property with our assistance.
					</p>
				</div>
			</div>

			<div className="text-center mt-10">
				<p className="text-lg text-slate-700">
					At Realt Estate, we are committed to making your real estate
					experience enjoyable and successful. Our dedicated team of experienced
					agents is here to assist you at every step of the way.
				</p>
			</div>
		</div>
	);
};

export default About;
