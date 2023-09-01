interface Props {
  props: {
    name: string;
    review: string;
    date: string;
  };
}

export default function RestaurantReview({ props }: Props) {
  return (
    <div>
      <div
        className="flex flex-row"
        style={{
          borderBottom: "1px solid #000",
          marginRight: "20px",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            marginTop: "30px",
            maxWidth: "500px",
            fontSize: "20px",
            fontWeight: "normal",
            color: "black",
            marginRight: "10px",
          }}
        >
          {props.name}
        </p>
        <p
          style={{
            marginTop: "37.5px",
            maxWidth: "500px",
            fontSize: "13px",
            fontWeight: "normal",
            color: "gray",
          }}
        >
          {props.date}
        </p>
      </div>
      <div>
        <p
          style={{
            maxWidth: "500px",
            fontSize: "15px",
            fontWeight: "normal",
            color: "black",
          }}
        >
          {props.review}
        </p>
      </div>
    </div>
  );
}
