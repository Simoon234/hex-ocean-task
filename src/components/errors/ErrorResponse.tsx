import { ErrorResponse } from "../../types";

function ErrorsResponse({ customError }: ErrorResponse) {
  return (
    <div>
      {customError?.map((item) => {
        return (
          <div
            className="bg-red-600 w-full mt-2 rounded p-2 cursor-default"
            key={34}
          >
            {item.name && (
              <div className="error">
                {item.name.map((msg) => (
                  <div key={1}>
                    <span className="underline underline-offset-4">Name: </span>
                    <span aria-label="name">{msg}</span>
                  </div>
                ))}
              </div>
            )}
            {item.no_of_slices && (
              <div className="error">
                {item.no_of_slices.map((msg) => (
                  <div key={2}>
                    <span className="underline underline-offset-4">
                      Number of slices:{" "}
                    </span>
                    <span aria-label="number_of_slices">{msg}</span>
                  </div>
                ))}
              </div>
            )}
            {item.type && (
              <div className="error">
                {item.type.map((msg) => (
                  <div key={3}>
                    <span className="underline underline-offset-4">Type:</span>
                    <span aria-label="type">{msg}</span>
                  </div>
                ))}
              </div>
            )}
            {item.preparation_time && (
              <div className="error">
                {item.preparation_time.map((msg) => (
                  <div key={4}>
                    <span className="underline underline-offset-4">
                      Preparation time:
                    </span>{" "}
                    <span aria-label="preparation_time">{msg}</span>
                  </div>
                ))}
              </div>
            )}
            {item.spiciness_scale && (
              <div className="error">
                {item.spiciness_scale.map((msg) => (
                  <div key={5}>
                    <span className="underline underline-offset-4">
                      Spiciness scale:
                    </span>
                    <span aria-label="spiciness">{msg}</span>
                  </div>
                ))}
              </div>
            )}
            {item.slices_of_bread && (
              <div className="error">
                {item.slices_of_bread.map((msg) => (
                  <div key={6}>
                    <span className="underline underline-offset-4">
                      Slices of bread:
                    </span>
                    <span aria-label="slices_of_bread">{msg}</span>
                  </div>
                ))}
              </div>
            )}
            {item.diameter && (
              <div className="error">
                {item.diameter.map((msg) => (
                  <div key={6}>
                    <span className="underline underline-offset-4">
                      Diameter:
                    </span>
                    <span aria-label="diameter">{msg}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ErrorsResponse;
