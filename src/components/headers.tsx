"use client"

import { useState, useContext } from "react"
// import Link from "next/link"
import { Menu, X } from "lucide-react"
import { CrowdFundingContext } from "../../Context/CrowdFunding.js";
import Link from "next/link.js";


interface HeaderProps {
  isScrolled: boolean
}

export default function Headers({ isScrolled }: HeaderProps) {

  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
  

  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Landing", href: "/" },
    { label: "Create Campaign", href: "/connect" },
    { label: "Campaigns", href: "/connect" },
    { label: "Token Engine", href: "/token-engine" },
    { label: "Learn", href: "#learn" },
    // { label: "Connect", href: "#connect" },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-purple-100/50" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-purple-500/50">
            <span className="text-white font-bold text-lg">FDA</span>
          </div>
          <span className="font-extrabold text-xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent hidden sm:inline">FUNDORA</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            item.href.startsWith("/") ? (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-purple-600 font-semibold transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 group-hover:w-full transition-all duration-300" />
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-purple-600 font-semibold transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 group-hover:w-full transition-all duration-300" />
              </a>
            )
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* <button className="px-6 py-2 text-black font-medium hover:text-gray-700 transition-colors">Sign In</button> */}
          <button className="px-6 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-full font-semibold hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105">
            {!currentAccount && (
              <ul className="flex items-center hidden space-x-8 lg:flex">
                <li>
                  <p
                    onClick={() => connectWallet()}
                    className=""
                    aria-label="Sign Up"
                    title="Sign Up"
                  >
                    Connect Wallet
                  </p>
                </li>
              </ul>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-purple-100/50 animate-fade-in-up">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              item.href.startsWith("/") ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-lg transition-all font-semibold hover:text-purple-600"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-lg transition-all font-semibold hover:text-purple-600"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              )
            ))}
            <div className="pt-4 border-t border-purple-100/50 space-y-2">
              
              <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all shadow-lg">
                {!currentAccount && (
                  <ul className="flex items-center hidden space-x-8 lg:flex">
                    <li>
                      <p
                        onClick={() => connectWallet()}
                        className=""
                        aria-label="Sign Up"
                        title="Sign Up"
                      >
                        Connect Wallet
                      </p>
                    </li>
                  </ul>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
