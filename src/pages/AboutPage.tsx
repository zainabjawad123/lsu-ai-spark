
const AboutPage = () => {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-lsu-purple mb-6">About LSU AI Spark</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            LSU AI Spark is a dedicated learning platform designed to help students master artificial intelligence 
            concepts through interactive video lessons, practical quizzes, and expert-led content.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            Our mission is to make AI education accessible, engaging, and effective for all LSU students. 
            We believe that understanding AI is essential for future careers across disciplines, and we're 
            committed to providing high-quality educational resources that help students build valuable skills.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Why LSU AI Spark?</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li>
              <strong>Expert-led content:</strong> All modules are developed by AI specialists and LSU faculty with deep expertise in the field.
            </li>
            <li>
              <strong>Learn at your pace:</strong> Our platform allows you to progress through modules on your schedule, making learning flexible.
            </li>
            <li>
              <strong>Interactive learning:</strong> Quizzes and hands-on exercises help reinforce concepts and ensure understanding.
            </li>
            <li>
              <strong>Track your progress:</strong> Monitor your advancement through each module with intuitive progress tracking.
            </li>
            <li>
              <strong>Earn certificates:</strong> Showcase your knowledge with certificates of completion for each module.
            </li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-2">
            Have questions or suggestions about LSU AI Spark? We'd love to hear from you.
          </p>
          <p className="text-gray-700">
            Email: <a href="mailto:aispark@lsu.edu" className="text-lsu-purple hover:underline">aispark@lsu.edu</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
