export async function fetchStatuses() {
    try {
      const response = await fetch(api + "/Status/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Getting statuses failed");
      }
      const data = await response.json();
      setStatuses(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  export async function fetchUserStatus() {
    try {
      const response = await fetch(api + "/TitleStatus/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Getting userStatus failed");
      }
      const data = await response.json();
      setUserStatus(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  export async function fetchTitle() {
    try {
      const response = await fetch(api + "/title/" + id);
      if (!response.ok) {
        throw new Error("getting title failed");
      }
      const data = await response.json();
      setTitle(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  export async function fetchUserReview() {
    try {
      const response = await fetch(api + "/review/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Getting review failed");
      }
      const data = await response.json();
      setUserReview(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }