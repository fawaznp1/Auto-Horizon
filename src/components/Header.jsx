import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Car } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when screen gets larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
        setMobileDropdowns({});
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { 
      name: 'Sections', 
      href: '#',
      dropdown: [
        { name: 'Vintage', href: '/vintage' },
        { name: 'Latest', href: '/latest' },
        { name: 'Diesel', href: '/diesel' },
        { name: 'Electric', href: '/electric' },
        { name: 'Hybrid', href: '/hybrid' }
      ]
    },
  ];

  // Simple close function
  const closeMobileMenu = () => {
    setIsOpen(false);
    setMobileDropdowns({});
  };

  // Toggle mobile menu
  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
    if (isOpen) {
      setMobileDropdowns({});
    }
  };

  const toggleMobileDropdown = (index, e) => {
    e.stopPropagation();
    setMobileDropdowns(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleDesktopDropdownEnter = (index) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(index);
  };

  const handleDesktopDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleLinkClick = (e, href) => {
    // Handle smooth scrolling for anchor links
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Always close mobile menu when clicking a link
    closeMobileMenu();
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Only close if clicking outside the nav element
      if (isOpen && !e.target.closest('nav')) {
        closeMobileMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleDocumentClick);
      document.addEventListener('touchstart', handleDocumentClick);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('touchstart', handleDocumentClick);
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMobileMenu();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/20' 
          : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a 
                href="/" 
                className="flex items-center space-x-2 no-underline hover:no-underline focus:no-underline"
                style={{ textDecoration: 'none' }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Car className="w-4 h-4 text-white" />
                </div>
                <span className={`font-bold text-xl transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  Auto Horizon
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <div key={index} className="relative group">
                    <a
                      href={item.href}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10 no-underline hover:no-underline focus:no-underline group ${
                        isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white'
                      }`}
                      style={{ textDecoration: 'none' }}
                      onMouseEnter={() => item.dropdown && handleDesktopDropdownEnter(index)}
                      onMouseLeave={() => item.dropdown && handleDesktopDropdownLeave()}
                      onClick={(e) => {
                        if (item.dropdown) {
                          e.preventDefault();
                        } else {
                          handleLinkClick(e, item.href);
                        }
                      }}
                    >
                      <span>{item.name}</span>
                      {item.dropdown && (
                        <ChevronDown className={`w-4 h-4 transition-all duration-300 ${
                          activeDropdown === index ? 'rotate-180 text-blue-500' : 'rotate-0'
                        }`} />
                      )}
                    </a>
                    
                    {/* Desktop Dropdown Menu */}
                    {item.dropdown && (
                      <div 
                        className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200/20 py-3 transform transition-all duration-300 ease-out ${
                          activeDropdown === index 
                            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                        }`}
                        onMouseEnter={() => handleDesktopDropdownEnter(index)}
                        onMouseLeave={handleDesktopDropdownLeave}
                      >
                        <div className="absolute -top-2 left-6 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-200/20"></div>
                        {item.dropdown.map((dropdownItem, dropdownIndex) => (
                          <a
                            key={dropdownIndex}
                            href={dropdownItem.href}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200 no-underline hover:no-underline focus:no-underline group/item"
                            style={{ textDecoration: 'none' }}
                            onClick={(e) => handleLinkClick(e, dropdownItem.href)}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                            <span className="group-hover/item:translate-x-1 transition-transform duration-200">{dropdownItem.name}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* CTA Button */}
                <a 
                  href='/join' 
                  className="no-underline hover:no-underline focus:no-underline"
                  style={{ textDecoration: 'none' }}
                >
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Join Us
                  </button>
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle mobile menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeMobileMenu}>
          <div 
            className="fixed top-16 left-0 right-0 bg-white shadow-xl z-50 max-h-[calc(100vh-4rem)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <div key={index} className="border-b border-gray-100 last:border-b-0 pb-2 last:pb-0">
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={(e) => toggleMobileDropdown(index, e)}
                        className="w-full flex items-center justify-between px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 text-left font-medium"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-all duration-300 ${
                          mobileDropdowns[index] ? 'rotate-180 text-blue-500' : 'rotate-0'
                        }`} />
                      </button>
                      
                      {/* Mobile Dropdown Content */}
                      {mobileDropdowns[index] && (
                        <div className="mt-2">
                          <div className="ml-4 space-y-1 bg-gray-50 rounded-lg p-2">
                            {item.dropdown.map((dropdownItem, dropdownIndex) => (
                              <a
                                key={dropdownIndex}
                                href={dropdownItem.href}
                                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-200 no-underline hover:no-underline focus:no-underline group"
                                style={{ textDecoration: 'none' }}
                                onClick={(e) => handleLinkClick(e, dropdownItem.href)}
                              >
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-200"></div>
                                <span className="group-hover:translate-x-1 transition-transform duration-200">{dropdownItem.name}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 no-underline hover:no-underline focus:no-underline font-medium"
                      style={{ textDecoration: 'none' }}
                      onClick={(e) => handleLinkClick(e, item.href)}
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <a 
                  href="/join"
                  className="no-underline hover:no-underline focus:no-underline"
                  style={{ textDecoration: 'none' }}
                  onClick={closeMobileMenu}
                >
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
                    Join Us
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;