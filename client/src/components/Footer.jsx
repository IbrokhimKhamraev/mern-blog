import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import {BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble, BsTelegram} from 'react-icons/bs'

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to={"/"}
              className="font-semibold dark:text-white text-lg sm:text-xl"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Ibrokhim's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.100jsprojects.com"
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  100 JS Projects
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  Ibrokhim's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Foolow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/IbrokhimKhamraev"
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="#"
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Foolow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href="#">
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider/>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
         <Footer.Copyright href="#" by="Ibrokhim's blog" year={new Date().getFullYear()}/>
         <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="https://www.facebook.com/profile.php?id=100068643047309" icon={BsFacebook}/>
            <Footer.Icon href="https://www.instagram.com/i.hamraev0095" icon={BsInstagram}/>
            <Footer.Icon href="https://twitter.com/i_hamraev95" icon={BsTwitter}/>
            <Footer.Icon href="https://github.com/IbrokhimKhamraev" icon={BsGithub}/>
            <Footer.Icon href="https://t.me/Ibrohim_Hamraev95" icon={BsTelegram}/>
         </div>
        </div>
      </div>
    </Footer>
  );
}
