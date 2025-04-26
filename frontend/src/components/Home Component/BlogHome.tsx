import { JSX } from "react";
import "../../../styles/BlogHomePage.css";

export default function HomeBlogPage(): JSX.Element {
  return (
    <div id="homeBlogComponent">
      <section id="checkout_summary">
        <div className="blog-card">
          <img
            src="https://images.unsplash.com/photo-1615147342761-9238e15d8b96?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80"
            alt="brown couch"
            className="blog-card__image"
          />
          <div className="blog-card__content">
            <time className="blog-card__date">30 März 2021</time>
            <h2 className="blog-card__title">
              Duis autem vel eum iriure dolor in hend in vulputate
            </h2>
            <p className="blog-card__excerpt">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
              odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
          </div>
          <div className="blog-card__comments">
            <h3>Leave a Comment</h3>
            <textarea placeholder="Write your comment…" rows={3}></textarea>
            <button type="button">Post Comment</button>
          </div>
        </div>
      </section>
      <section id="checkout_summary">
        <div className="blog-card">
          <img
            src="/images/blog/1.jpg"
            alt="brown couch"
            className="blog-card__image"
          />
          <div className="blog-card__content">
            <time className="blog-card__date">30 März 2021</time>
            <h2 className="blog-card__title">
              Duis autem vel eum iriure dolor in hend in vulputate
            </h2>
            <p className="blog-card__excerpt">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
              odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
          </div>
          <div className="blog-card__comments">
            <h3>Leave a Comment</h3>
            <textarea placeholder="Write your comment…" rows={3}></textarea>
            <button type="button">Post Comment</button>
          </div>
        </div>
      </section>
      <section id="checkout_summary">
        <div className="blog-card">
          <img
            src="/images/blog/2.jpg"
            alt="brown couch"
            className="blog-card__image"
          />
          <div className="blog-card__content">
            <time className="blog-card__date">30 März 2021</time>
            <h2 className="blog-card__title">
              Duis autem vel eum iriure dolor in hend in vulputate
            </h2>
            <p className="blog-card__excerpt">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
              odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
          </div>
          <div className="blog-card__comments">
            <h3>Leave a Comment</h3>
            <textarea placeholder="Write your comment…" rows={3}></textarea>
            <button type="button">Post Comment</button>
          </div>
        </div>
      </section>
      <section id="checkout_summary">
        <div className="blog-card">
          <img
            src="/images/blog/3.jpg"
            alt="brown couch"
            className="blog-card__image"
          />
          <div className="blog-card__content">
            <time className="blog-card__date">30 März 2021</time>
            <h2 className="blog-card__title">
              Duis autem vel eum iriure dolor in hend in vulputate
            </h2>
            <p className="blog-card__excerpt">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
              odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
          </div>
          <div className="blog-card__comments">
            <h3>Leave a Comment</h3>
            <textarea placeholder="Write your comment…" rows={3}></textarea>
            <button type="button">Post Comment</button>
          </div>
        </div>
      </section>
      <section id="checkout_summary">
        <div className="blog-card">
          <img
            src="/images/blog/4.jpg"
            alt="brown couch"
            className="blog-card__image"
          />
          <div className="blog-card__content">
            <time className="blog-card__date">30 März 2021</time>
            <h2 className="blog-card__title">
              Duis autem vel eum iriure dolor in hend in vulputate
            </h2>
            <p className="blog-card__excerpt">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
              odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
          </div>
          <div className="blog-card__comments">
            <h3>Leave a Comment</h3>
            <textarea placeholder="Write your comment…" rows={3}></textarea>
            <button type="button">Post Comment</button>
          </div>
        </div>
      </section>

    </div>
  );
}
