import * as React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiFillStar } from "react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StarRatings from "react-star-ratings";
import { List } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RestaurantReview from "./restaurantReview";

interface Props {
  props: {
    id: string;
    name: string;
    description: string;
    pictureId: string;
    city: string;
    rating: number;
  };
}

export default function RestaurantCard({ props }: Props) {
  const [details, setDetails] = React.useState({});
  const [photo, setPhoto] = React.useState({});
  const price = (parseInt(props.pictureId) % 4) + 1;
  const isOpen = (parseInt(props.pictureId) % 2) + 1 == 1 ? "open" : "closed";
  const apiUrl = "https://restaurant-api.dicoding.dev";

  const getAllDetails = () => {
    axios
      .get(`${apiUrl}/detail/${props.id}`)
      .then((response) => {
        const allDetails = response.data.restaurant;
        setDetails(allDetails);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getImage = () => {
    axios
      .get(
        `https://restaurant-api.dicoding.dev/images/medium/${props.pictureId}`
      )
      .then((response) => {
        setPhoto(response);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const imageUrl = `https://restaurant-api.dicoding.dev/images/medium/${props.pictureId}`;

  try {
    React.useEffect(() => {
      getAllDetails();
      getImage();
    }, [details]);
  } catch (error) {}

  return (
    <div
      id={"card" + props.id}
      className={
        "$".repeat(price) +
        " " +
        isOpen +
        " " +
        (details.categories ? details.categories[0].name : "")
      }
    >
      <Card className="w-[100%]">
        <CardContent>
          <div
            className="flex flex-col"
            style={{
              marginTop: "60px",
            }}
          >
            <div
              style={{
                margin: "auto",
              }}
            >
              <img src={imageUrl} alt="" width="350" height="350" />
            </div>

            <h1
              style={{
                marginTop: "60px",
                marginLeft: "24px",
                marginRight: "24px",
                fontSize: "20px",
              }}
            >
              {props.name}
            </h1>
            <div
              style={{
                marginLeft: "24px",
                marginTop: "1px",
              }}
            >
              <StarRatings
                rating={props.rating}
                starRatedColor="black"
                numberOfStars={5}
                name="rating"
                starEmptyColor="gray"
                starDimension="20px"
                starSpacing="1px"
              ></StarRatings>
            </div>
            <div
              className="flex flex-row"
              style={{
                marginLeft: "24px",
                marginTop: "8px",
                marginRight: "24px",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  color: "gray",
                }}
              >
                {details.categories ? details.categories[0].name : ""} |{" "}
                {"$".repeat(price)}
              </p>
              {isOpen == "open" ? (
                <p
                  style={{
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  OPEN NOW
                </p>
              ) : (
                <p
                  style={{
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  CLOSED
                </p>
              )}
            </div>
            <div>
              <Dialog>
                <DialogTrigger
                  id={"modal " + props.id}
                  style={{ display: "none" }}
                ></DialogTrigger>

                <DialogContent>
                  <div
                    style={{
                      height: "800px",
                      width: "480px",
                      overflow: "auto",
                      marginTop: "30px",
                      marginRight: "30px",
                    }}
                  >
                    <DialogHeader>
                      <DialogDescription
                        style={{
                          marginRight: "15px",
                        }}
                      >
                        <img src={imageUrl} alt="" width="600" height="600" />
                      </DialogDescription>
                      <DialogTitle style={{ marginTop: "30px" }}>
                        <span style={{ marginRight: "5px", fontSize: "40px" }}>
                          {props.name + "  "}
                        </span>
                        <span
                          style={{
                            fontWeight: "lighter",
                          }}
                        >
                          ({props.rating}
                          <span
                            style={{
                              color: "black",
                              marginLeft: "5px",
                            }}
                          >
                            &#9733;
                          </span>
                          )
                        </span>
                      </DialogTitle>
                      <DialogDescription
                        style={{
                          marginRight: "15px",
                        }}
                      >
                        <p
                          style={{
                            maxWidth: "500px",
                          }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nullam sit amet turpis varius, malesuada urna
                          eget, condimentum nisi. Curabitur libero enim, dictum
                          in bibendum quis, efficitur suscipit justo. Nullam
                          vitae mattis eros.
                        </p>
                        <p
                          style={{
                            marginTop: "30px",
                            maxWidth: "500px",
                            fontSize: "30px",
                            fontWeight: "bolder",
                            color: "black",
                          }}
                        >
                          Reviews
                        </p>
                      </DialogDescription>
                    </DialogHeader>
                    {details.customerReviews ? (
                      details.customerReviews.map((filter, index) => {
                        return (
                          <RestaurantReview
                            key={filter}
                            props={filter}
                          ></RestaurantReview>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Button
              style={{
                marginLeft: "24px",
                marginRight: "24px",
                marginTop: "50px",
                backgroundColor: "#012a56",
                borderRadius: "0",
              }}
              onClick={() => {
                document.getElementById("modal " + props.id)?.click();
              }}
            >
              LEARN MORE
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
