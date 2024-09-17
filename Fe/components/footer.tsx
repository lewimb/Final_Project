export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6">
            <h2 className="text-lg font-bold mb-4">Company</h2>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac
              vulputate velit, et scelerisque nisl.
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="w-full md:w-1/3 mb-6">
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-sm hover:text-gray-300">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-sm hover:text-gray-300">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-sm hover:text-gray-300">
                  Services
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-sm hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="w-full md:w-1/3 mb-6">
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <p className="text-sm">123 Street Name, City, Country</p>
            <p className="text-sm">Phone: +123 456 7890</p>
            <p className="text-sm">Email: info@example.com</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-600 pt-6 text-center text-sm">
          <p>&copy; 2024 Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
