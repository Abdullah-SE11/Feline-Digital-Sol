'use client';

const Contact = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add form submission logic here
        alert('Form submitted! (This is a placeholder)');
    };

    return (
        <section id="contact" className="contact">
            <div className="section-tag">Contact Us</div>
            <h2>Let's Build <span>Something Extraordinary</span></h2>

            <div className="contact-card">
                <div className="contact-container">
                    <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" id="name" name="name" placeholder="Your Name" required />
                        </div>
                        <div className="form-group">
                            <input type="email" id="email" name="email" placeholder="Your Email" required />
                        </div>
                        <div className="form-group">
                            <textarea id="message" name="message" placeholder="How can we help?" required></textarea>
                        </div>
                        <button type="submit" className="btn-main">Send Message</button>
                    </form>

                    <div className="contact-info">
                        <div className="info-item">
                            <h4>Direct Reach</h4>
                            <p>hello@feline.digital</p>
                        </div>
                        <div className="info-item">
                            <h4>Current Focus</h4>
                            <p>Taking on select projects for Q2 2026.</p>
                        </div>
                        <div className="info-item">
                            <h4>Social Synergy</h4>
                            <div className="social-circles">
                                <a href="https://x.com/Joe_Black_Jack" target="_blank" rel="noopener noreferrer" className="social-circle">X</a>
                                <a href="https://www.instagram.com/abdullah._dev/" target="_blank" rel="noopener noreferrer" className="social-circle">IG</a>
                                <a href="https://www.linkedin.com/company/feline-media-marketing/" target="_blank" rel="noopener noreferrer" className="social-circle">LI</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
