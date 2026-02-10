import Link from 'next/link';

const Navbar = () => {
    return (
        <nav>
            <div className="logo">FELINE<span>.DIGITAL</span></div>
            <div className="nav-links">
                <Link href="#services">Services</Link>
                <Link href="#about">About</Link>
                <a href="https://x.com/Joe_Black_Jack" target="_blank" rel="noopener noreferrer">X</a>
                <a href="https://www.instagram.com/abdullah._dev/" target="_blank" rel="noopener noreferrer">IG</a>
                <a href="https://www.linkedin.com/company/feline-media-marketing/" target="_blank" rel="noopener noreferrer">LI</a>
                <Link href="#contact" className="btn-primary">Connect</Link>
            </div>
        </nav>
    );
};

export default Navbar;
