import React from "react";
import "./HomeSection2.css";

function HomeSection2() {
	return (
		<section id="aboutSection" className="section-2">
			<div className="section-2-textbox">
				<p className="section-2-text">
					I am a software engineer with a strong focus on backend development,
					specializing in building robust, secure, and scalable systems to
					support websites and mobile apps. While my expertise lies in backend
					engineering, I also have a solid understanding of front-end
					development, enabling seamless integration between the two. I thrive
					in collaborative environments and leverage AI tools to optimize
					development workflows, ensuring efficient and high-quality software
					solutions.
				</p>
			</div>
			<img
				src={require("./../../../asset/main_photo2.jpg")}
				className="profile-picture-2"
				alt="profile-picture-2"
				loading="lazy"
			/>
		</section>
	);
}

export default HomeSection2;
