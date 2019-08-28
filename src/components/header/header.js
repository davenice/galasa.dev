import { useStaticQuery, graphql, Link } from "gatsby"
import React, { useState } from "react"
import { Location } from "@reach/router"

import Identifier from "../identifier"
import { isSelectedSection } from "../../utils/section"

import headerStyles from "./header.module.scss"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  function selector(section, location) {
    return isSelectedSection(section, location) ? headerStyles.selected : ""
  }

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
      cross: file(
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "cross.svg" }
      ) {
        publicURL
      }
      hamburger: file(
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "hamburger.svg" }
      ) {
        publicURL
      }
    }
  `)

  return (
    <Location>
      {({ location }) => (
        <header
          className={
            headerStyles.header + " " + (menuOpen ? headerStyles.openMenu : "")
          }
        >
          <h1 className={headerStyles.title}>
            <Identifier />
          </h1>
          <div className={headerStyles.navContainer}>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={
                headerStyles.navLink + " " + selector("about", location)
              }
            >
              About
            </Link>
            <Link
              to="/tutorials"
              onClick={() => setMenuOpen(false)}
              className={
                headerStyles.navLink + " " + selector("tutorials", location)
              }
            >
              Tutorials
            </Link>
            <Link
              to="/docs"
              onClick={() => setMenuOpen(false)}
              className={
                headerStyles.navLink + " " + selector("docs", location)
              }
            >
              Docs
            </Link>
            <Link
              to="/downloads"
              onClick={() => setMenuOpen(false)}
              className={
                headerStyles.navLink + " " + selector("downloads", location)
              }
            >
              Downloads
            </Link>
            <Link
              to="/support"
              onClick={() => setMenuOpen(false)}
              className={
                headerStyles.navLink + " " + selector("support", location)
              }
            >
              Support
            </Link>
          </div>
          <div
            className={headerStyles.closeX}
            onClick={() => setMenuOpen(false)}
          >
            <img
              className={headerStyles.image}
              alt="Close"
              src={data.cross.publicURL}
            />
          </div>
          <div
            className={headerStyles.hamburger}
            onClick={() => setMenuOpen(true)}
          >
            <img
              className={headerStyles.image}
              alt="Menu"
              src={data.hamburger.publicURL}
            />
          </div>
        </header>
      )}
    </Location>
  )
}

export default Header