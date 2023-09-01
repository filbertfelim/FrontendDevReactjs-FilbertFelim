"use client";
import * as React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import RestaurantCard from "./restaurantCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

export default function RestaurantApp() {
  const [price, setPrice] = React.useState("");
  const [isOpen, setIsOpen] = React.useState("");
  const [restaurants, setRestaurants] = React.useState<any[]>([]);
  const [category, setCategory] = React.useState(new Array<string>());
  const [restaurantDetails, setRestaurantDetails] = React.useState<any[]>([]);
  const [activeCategory, setActiveCategory] = React.useState("");
  const apiUrl = "https://restaurant-api.dicoding.dev";

  React.useEffect(() => {
    getAllRestaurants();
    getAllCategories();
    getAllDetails();
  }, [restaurantDetails]);

  const getAllRestaurants = () => {
    axios
      .get(`${apiUrl}/list`)
      .then((response) => {
        const allRestaurants = response.data.restaurants;
        setRestaurants(allRestaurants);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  function onlyUnique(value: any, index: any, array: string | any[]) {
    return array.indexOf(value) === index;
  }

  const getAllCategories = async () => {
    try {
      const fetchPromises = restaurants.map((filter) => {
        return axios
          .get(`${apiUrl}/detail/${filter.id}`)
          .then((response) => response.data.restaurant.categories[0].name)
          .catch((error) => {
            console.error(`Error: ${error}`);
            return null;
          });
      });

      const categoryNames = await Promise.all(fetchPromises);

      var filteredCategoryNames = categoryNames.filter((name) => name !== null);

      filteredCategoryNames = filteredCategoryNames.filter(onlyUnique);

      setCategory(filteredCategoryNames);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const getAllDetails = async () => {
    try {
      const fetchPromises = restaurants.map((filter) => {
        return axios
          .get(`${apiUrl}/detail/${filter.id}`)
          .then((response) => response.data.restaurant)
          .catch((error) => {
            console.error(`Error: ${error}`);
            return null;
          });
      });

      const resDetails = await Promise.all(fetchPromises);
      setRestaurantDetails(resDetails);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <>
      <div>
        <h1
          style={{
            marginTop: "24px",
            marginLeft: "24px",
            marginRight: "24px",
            fontSize: "50px",
          }}
        >
          Restaurants
        </h1>
        <p
          style={{
            marginTop: "12px",
            marginLeft: "24px",
            paddingRight: "100px",
            maxWidth: "1000px",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit
          amet turpis varius, malesuada urna eget, condimentum nisi. Curabitur
          libero enim, dictum in bibendum quis, efficitur suscipit justo. Nullam
          vitae mattis eros.
        </p>
      </div>
      <div>
        <Separator className="my-4" />
        <div className="flex h-10">
          <p
            style={{
              margin: "auto 12px auto 24px",
            }}
          >
            Filter By :
          </p>
          {isOpen == "open" ? (
            <Toggle
              variant={"outline"}
              style={{
                backgroundColor: "green",
                color: "white",
              }}
              onClick={() => setIsOpen("")}
            >
              Open Now
            </Toggle>
          ) : (
            <Toggle
              variant={"outline"}
              style={{
                backgroundColor: "white",
                color: "black",
              }}
              onClick={() => setIsOpen("open")}
            >
              Open Now
            </Toggle>
          )}
          <div style={{ marginLeft: "12px" }}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Price{" "}
                  <span style={{ marginBottom: "8px", marginLeft: "10px" }}>
                    &#8964;
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={price} onValueChange={setPrice}>
                  <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="$">$</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="$$">$$</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="$$$">$$$</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="$$$$">
                    $$$$
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div style={{ marginLeft: "12px" }}>
            <div style={{ marginLeft: "12px" }}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Categories{" "}
                    <span style={{ marginBottom: "8px", marginLeft: "10px" }}>
                      &#8964;
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuRadioGroup
                    value={activeCategory}
                    onValueChange={setActiveCategory}
                  >
                    <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                    {category.map((filter, index) => {
                      return (
                        <DropdownMenuRadioItem key={filter} value={filter}>
                          {filter}
                        </DropdownMenuRadioItem>
                      );
                    })}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div>
          <h1
            style={{
              marginTop: "60px",
              marginLeft: "24px",
              marginRight: "24px",
              marginBottom: "30px",
              fontSize: "30px",
            }}
          >
            All Restaurants
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "25% 25% 25% 25%",
              columnGap: "20px",
              marginLeft: "24px",
              marginRight: "24px",
              marginBottom: "24px",
            }}
          >
            {restaurants.map((filter, index) => {
              const isRestaurantOpen =
                (parseInt(filter.pictureId) % 2) + 1 == 1 ? "open" : "closed";
              var show = "block";
              if (price == "" && isOpen == "" && activeCategory == "") {
                show = "block";
              } else if (price != "" && isOpen != "" && activeCategory == "") {
                if (
                  price == "$".repeat((parseInt(filter.pictureId) % 4) + 1) &&
                  isOpen == isRestaurantOpen
                ) {
                  show = "block";
                } else {
                  show = "none";
                }
              } else if (price == "" && isOpen != "" && activeCategory != "") {
                if (
                  isOpen == isRestaurantOpen &&
                  activeCategory == restaurantDetails[index].categories[0].name
                ) {
                  show = "block";
                } else {
                  show = "none";
                }
              } else if (price != "" && isOpen == "" && activeCategory != "") {
                if (
                  price == "$".repeat((parseInt(filter.pictureId) % 4) + 1) &&
                  activeCategory == restaurantDetails[index].categories[0].name
                ) {
                  show = "block";
                } else {
                  show = "none";
                }
              } else if (price != "" && isOpen == "" && activeCategory == "") {
                if (price == "$".repeat((parseInt(filter.pictureId) % 4) + 1)) {
                  show = "block";
                } else {
                  show = "none";
                }
              } else if (price == "" && isOpen != "" && activeCategory == "") {
                if (isOpen == isRestaurantOpen) {
                  show = "block";
                } else {
                  show = "none";
                }
              } else if (price == "" && isOpen == "" && activeCategory != "") {
                if (
                  activeCategory == restaurantDetails[index].categories[0].name
                ) {
                  show = "block";
                } else {
                  show = "none";
                }
              } else if (price != "" && isOpen != "" && activeCategory != "") {
                if (
                  activeCategory ==
                    restaurantDetails[index].categories[0].name &&
                  isOpen == isRestaurantOpen &&
                  price == "$".repeat((parseInt(filter.pictureId) % 4) + 1)
                ) {
                  show = "block";
                } else {
                  show = "none";
                }
              }
              return (
                <div
                  key={index}
                  style={{
                    marginBottom: "50px",
                    display: show,
                  }}
                >
                  <RestaurantCard props={filter}></RestaurantCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
