import React from "react";

export default function Home() {
  return (
    <section className="banner_part">
      <div className="container">
        <div className="row align-content-center">
          <div className="col-lg-6">
            <div className="banner_text aling-items-center">
              <div className="banner_text_iner">
                <h5>Book your desired place for your next trip</h5>
                <h2 className="text-capitalize">
                  Everyone Deserves The Opportunity of a relaxing Weekend
                </h2>
                <p>
                  Enim a, scelerisque aliquet vivamus neque diam sed at pede do
                  laos orci. Potenti vel in sagittis nulla augue vitae et tempus
                  torquent dicid Lacinia neque mus maleware poside
                </p>
                <a href="/worldMap" className="btn_1 banner_btn ">
                  View Properties
                </a>
                <div className="d-none d-xl-block banner_social_icon">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <a href="facebook.com">
                        <span className="fab fa-facebook"></span>facebook
                      </a>
                      <span className="dot">
                        <i className="fas fa-circle"></i>
                      </span>
                    </li>
                    <li className="list-inline-item">
                      <a href="twitter.com">
                        <span className="fab fa-twitter"></span>twitter
                      </a>
                      <span className="dot">
                        <i className="fas fa-circle"></i>
                      </span>
                    </li>
                    <li className="list-inline-item">
                      <a href="instagram.com">
                        <span className="fab fa-instagram"></span>instagram
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a
        href="https://www.youtube.com/watch?v=O4HmbEbCT2c"
        className="popup-youtube video_popup"
      >
        <span className="fas fa-play"></span>
      </a>
    </section>
  );
}
