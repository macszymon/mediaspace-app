export const api = "http://localhost:5186/api";

export async function fetchStatuses() {
  try {
    const response = await fetch(api + "/Status/");
    if (!response.ok) {
      throw new Error("Getting statuses failed");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function fetchCatrgories() {
  try {
    const response = await fetch(api + "/Category");
    if (!response.ok) {
      throw new Error("Getting categories failed");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function fetchTypes() {
  try {
    const response = await fetch(api + "/type");
    if (!response.ok) {
      throw new Error("Getting types failed");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function fetchUserStatus(id: string, token: string) {
  try {
    const response = await fetch(api + "/TitleStatus/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Getting userStatus failed");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function fetchUserStatuses(token: string, type?: string, status?: string) {
  try {
    const response = await fetch(api + "/TitleStatus/?type=" + type + "&status=" + status, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Getting userStatus failed");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function fetchTitles(type?: string, pageNumber?: string, sort?: string, titleName?: string, pageSize?: number, fromLastYear?: boolean) {
  try {
    const response = await fetch(api + "/title/?type=" + type + 
      (titleName ? "&titleName=" + titleName : "") + 
      (pageNumber ? "&pageNumber=" + pageNumber : "") + 
      (sort ? "&sortBy=" + sort + "&isDescending=true" : "") + 
      (pageSize ? "&pageSize=" + pageSize : "") +
      (fromLastYear ? "&fromCurrentYear=true" : ""));
    if (!response.ok) {
      throw new Error("Getting titles failded");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function fetchTitle(id: string) {
  try {
    const response = await fetch(api + "/title/" + id);
    if (!response.ok) {
      throw new Error("getting title failed");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function fetchUserReview(id: string, token: string) {
  try {
    const response = await fetch(api + "/review/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Getting review failed");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function createTitle(title: object, token: string) {
  try {
    const response = await fetch(api + "/title/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(title),
    });
    if (!response.ok) {
      throw new Error("Creating title failed");
    }
    const data = await response.json();
    return data
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function changeUserStatus(id: string, statusId: number, startDate: string, endDate: string, token: string) {
  try {
    const response = await fetch(api + "/TitleStatus/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        statusId: statusId,
        startDate: startDate,
        endDate: endDate,
      }),
    });
    if (!response.ok) {
      throw new Error("Changing status failed");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function createUserStatus(id: string, statusId: number, startDate: string, endDate: string, token: string) {
  try {
    const response = await fetch(api + "/TitleStatus/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        titleId: id,
        statusId: statusId,
        startDate: startDate,
        endDate: endDate,
      }),
    });
    if (!response.ok) {
      throw new Error("Changing status failed");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function removeUserStatus(id: string, token: string) {
  try {
    const response = await fetch(api + "/TitleStatus/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Deleting status failed");
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function changeReview(id: string, score: number, content: string = "", token: string) {
  try {
    const response = await fetch(api + "/Review/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        score: score,
        content: content,
      }),
    });
    if (!response.ok) {
      throw new Error("Changing score failed");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function addScore(id: string, score: number, token: string) {
  try {
    const response = await fetch(api + "/review/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        score: score,
        content: "",
      }),
    });
    if (!response.ok) {
      throw new Error("Changing score failed");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function removeReview(reviewId: number, token: string) {
  try {
    const response = await fetch(api + "/review/" + reviewId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Changing score failed");
    }
  } catch (error: any) {
    console.log(error.message);
  }
}
