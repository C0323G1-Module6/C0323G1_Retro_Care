import React from "react";
import { BsMeta, BsTwitter, BsYoutube, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="site-footer" id="contact">
      <div className="top-footer pt-5">
        <div className="sec-wp">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="footer-info">
                  <div className="footer-logo">
                    <a href="index.html">
                      <img src="logo.jpg" alt="" />
                    </a>
                  </div>
                  <p>Liên hệ với chúng tôi</p>
                  <div className="social-icon">
                    <ul>
                      <li>
                        <a href="#">
                          <BsMeta />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <BsInstagram />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <BsTwitter />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <BsYoutube />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="footer-flex-box">
                  <div className="footer-menu">
                    <h3 className="h3-title">Danh mục</h3>
                    <ul className="column-2">
                      <li>
                        <a href="#home">Dược phẩm</a>
                      </li>
                      <li>
                        <a href="#about">Thực phẩm chức năng</a>
                      </li>
                      <li>
                        <a href="#menu">Chăm sóc sức khoẻ</a>
                      </li>
                      <li>
                        <a href="#gallery">Chăm sóc da</a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-menu food-nav-menu">
                    <h3 className="h3-title">Liên kết</h3>
                    <ul className="column-2">
                      <li>
                        <a href="#about">Trang chủ</a>
                      </li>
                      <li>
                        <a href="#blog">Blog</a>
                      </li>
                      <li>
                        <a href="#contact">Contact</a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-menu">
                    <h3 className="h3-title">Về chúng tôi</h3>
                    <ul>
                      <li>
                        <a href="#">Chính sách</a>
                      </li>
                      <li>
                        <a href="#">Chăm sóc khách hàng</a>
                      </li>
                      <li>
                        <a href="#">Quy định giao hàng</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="copyright-text">
                <p>
                  Copyright &copy; 2023
                  <span className="name"> C0323G1 </span>CodeGym Đà Nẵng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
