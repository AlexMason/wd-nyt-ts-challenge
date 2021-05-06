import * as React from "react";
import { MouseEvent, ChangeEvent, Component } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { DocsEntity as IArticle, ArticleSearch } from "../types/ArticleSearch";

export interface NytProps {}

export interface NytState {
  searchInput: string;
  startDate: string | undefined;
  endDate: string | undefined;
  pageNumber: number;
  articles: Array<IArticle>;
}

class Nyt extends React.Component<NytProps, NytState> {
  constructor(props: NytProps) {
    super(props);

    this.state = {
      searchInput: "",
      startDate: undefined,
      endDate: undefined,
      articles: [],
      pageNumber: 0,
    };
  }

  componentDidMount() {
    this.fetchResults();
  }

  fetchResults = () => {
    let apiurl: string = process.env.REACT_APP_API_BASE_URL!;
    apiurl += `?api-key=${process.env.REACT_APP_API_KEY}`;
    apiurl += `&q=${this.state.searchInput}`;
    apiurl += this.state.startDate ? `&begin_date=${this.state.startDate}` : ``;
    apiurl += this.state.endDate ? `&end_date=${this.state.endDate}` : ``;
    apiurl += `&page=${this.state.pageNumber}`;

    fetch(apiurl!)
      .then((res) => res.json())
      .then((data: ArticleSearch) => {
        this.setState({
          articles: data.response.docs!,
        });
      });
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case "searchInput":
        this.setState({ searchInput: event.target.value });
        break;
      case "startDateInput":
        this.setState({ startDate: event.target.value });
        break;
      case "endDateInput":
        this.setState({ endDate: event.target.value });
        break;
    }
  };

  handleClick = (event: MouseEvent<HTMLInputElement>) => {
    switch ((event.target as HTMLElement).id) {
      case "prevBtn":
        this.setState(
          {
            pageNumber:
              this.state.pageNumber > 0 ? this.state.pageNumber - 1 : 0,
          },
          () => this.fetchResults()
        );
        break;
      case "nextBtn":
        this.setState({ pageNumber: this.state.pageNumber + 1 }, () =>
          this.fetchResults()
        );
        break;
    }
  };

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    this.fetchResults();
  };

  render() {
    return (
      <div className="mt-5">
        <Row>
          {/* Search Area */}
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="searchInput">
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.searchInput}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="startDateInput">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={this.handleChange}
                  value={this.state.startDate}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="endDateInput">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={this.handleChange}
                  value={this.state.endDate}
                ></Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>

          {/* Results Area */}
          <Col>
            <Col xs={12}>
              <Form inline>
                <Form.Control
                  type="button"
                  id="prevBtn"
                  value="Previous Page"
                  onClick={this.handleClick}
                />
                <Form.Control
                  id="nextBtn"
                  type="button"
                  value="Next Page"
                  onClick={this.handleClick}
                />
              </Form>
            </Col>
            {this.state.articles.map((article) => {
              return (
                <Row>
                  <Col>
                    <a href={article.web_url} target="_blank">
                      <Card>
                        <Card.Img
                          variant="top"
                          src={`https://www.nytimes.com/${article.multimedia[0].url}`}
                        />
                        <Card.Body>
                          <Card.Title>{article.headline.main}</Card.Title>
                          <Card.Text>
                            Keywords:{" "}
                            {article.keywords
                              .map((keyword) => {
                                return keyword.value;
                              })
                              .join(", ")}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </a>
                  </Col>
                </Row>
              );
            })}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Nyt;
