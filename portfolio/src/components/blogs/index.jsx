import React from "react";

import Section from "../shared/section";
import BlogCard from "./blog-card";
import Blog1 from "../../images/blogs/blog-thumb-1.jpg";
import Blog2 from "../../images/blogs/blog-thumb-2.jpg";

import "./style.scss";

const Blogs = () => {
    return (
        <Section
            id="blogs"
            title="Blogs & Articles"
            background="dark"
        >
            <div className="blogs-content-wrapper">
                <BlogCard
                    user="John Doe"
                    date="Mar 8 2022"
                    image={Blog1}
                    title="Improving Image Classification"
                    description="In this blog we have discussed how outlier in image can be affecting performance
                    so,we have used Cleanlab library to improve our accuracy on hackathon digit dataset"
                />
                <BlogCard
                    user="John Doe"
                    date="Mar 8 2022"
                    image={Blog2}
                    title="Quis Autem Vea Eum Iure Reprehendrit"
                    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                />
            </div>
        </Section>
    );
};

export default Blogs;
