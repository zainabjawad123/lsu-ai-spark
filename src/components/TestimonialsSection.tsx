
const testimonials = [
  {
    quote: "The AI Fundamentals module gave me a strong foundation and helped me understand concepts I had been struggling with.",
    author: "Jamie Chen",
    role: "Computer Science Student"
  },
  {
    quote: "I completed the Prompt Engineering module and immediately applied those skills in my research project. Highly recommended!",
    author: "Marcus Johnson",
    role: "Graduate Researcher"
  },
  {
    quote: "As someone new to AI, this platform made learning accessible and engaging. The video format really helped concepts sink in.",
    author: "Priya Patel",
    role: "Business Analytics Major"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold text-center text-lsu-purple mb-12">What Students Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-8 rounded-lg border border-gray-100 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 text-lsu-gold">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h10zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                </svg>
              </div>
              <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
              <div>
                <p className="font-semibold text-gray-800">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
