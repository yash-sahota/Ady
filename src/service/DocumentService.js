import * as axios from "axios";
import LocalStorageService from "../util/LocalStorageService";
import properties from "../properties";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
//import "firebase/analytics";

// These imports load individual services into the firebase namespace.
import "firebase/auth";
import "firebase/database";

//const fs = require('fs');
export const getAllDocument = async (documentType) => {
  const headers = {
    mode: "no-cors",
    Authorization: "Bearer " + LocalStorageService.getAccessToken(),
  };

  var config = {
    method: "get",
    url: "/api/medical-documents?documentType=" + documentType,
    headers: headers,
  };

  return await axios(config).then((response) => {
    return response.data;
  });
};

export const getDocuments = async (documentType, pageNumber) => {
  const headers = {
    mode: "no-cors",
    Authorization: "Bearer " + LocalStorageService.getAccessToken(),
  };

  var config = {
    method: "get",
    url:
      "/api/medical-documents?documentType=" +
      documentType +
      "&size=10&page=" +
      pageNumber,
    headers: headers,
  };

  return await axios(config).then((response) => {
    return response.data;
  });
};

export const getPatientDocuments = async (
  documentType,
  pageNumber,
  patientId
) => {
  const headers = {
    mode: "no-cors",
    Authorization: "Bearer " + LocalStorageService.getAccessToken(),
  };

  var config = {
    method: "get",
    url:
      "/api/medical-documents/patients/" +
      patientId +
      "?documentType=" +
      documentType +
      "&size=3&page=" +
      pageNumber,
    headers: headers,
  };

  return await axios(config).then((response) => {
    return response.data;
  });
};

export const getDoctorDocuments = async (
  documentType,
  pageNumber,
  doctorId
) => {
  const headers = {
    mode: "no-cors",
    Authorization: "Bearer " + LocalStorageService.getAccessToken(),
  };

  var config = {
    method: "get",
    url:
      "/api/medical-documents/doctor/?documentType=" +
      documentType +
      "&size=5&page=" +
      pageNumber +
      "&doctorId=" +
      doctorId,
    headers: headers,
  };

  return await axios(config).then((response) => {
    return response.data;
  });
};

export const getDoctorPatientDocuments = async (
  documentType,
  pageNumber,
  doctorId,
  patientId
) => {
  const headers = {
    mode: "no-cors",
    Authorization: "Bearer " + LocalStorageService.getAccessToken(),
  };

  var config = {
    method: "get",
    url:
      "/api/medical-documents/doctor/?documentType=" +
      documentType +
      "&size=5&page=" +
      pageNumber +
      "&doctorId=" +
      doctorId +
      "&patientId=" +
      patientId,
    headers: headers,
  };

  return await axios(config).then((response) => {
    return response.data;
  });
};

export const getDocument = async (doc) => {
  const headers = {
    mode: "no-cors",
    Authorization: "Bearer " + LocalStorageService.getAccessToken(),
  };

  var config = {
    method: "get",
    url: "/api/medical-document-retrival?docIdUser=" + doc.id + doc.uploadedBy,
    headers: headers,
  };

  return await axios(config).then((response) => {
    return response.data;
  });
};

export const postDocument = async (data) => {
  const headers = {
    mode: "no-cors",
    Authorization: "Bearer " + LocalStorageService.getAccessToken(),
  };

  const methodType = data.get("id") ? "PUT" : "POST";
  const medicalInfo = {
    id: data.get("id") ? data.get("id") : null,
    decription: data.get("decription"),
    duration: data.get("duration"),
    documentType: "Prescription",
    patientId: data.get("patientId"),
    doctorId: data.get("doctorId"),
  };

  const formData = new FormData();
  formData.append("file", data.get("prescriptionDocument"));
  formData.append("medicalInfo", JSON.stringify(medicalInfo));

  var config = {
    method: methodType,
    url: "/api/medical-document-upload",
    headers: headers,
    data: formData,
  };

  return await axios(config).then((response) => {
    return response.data;
  });
};

export const postLabDocument = async (data) => {
  const headers = {
    mode: "no-cors",
    Authorization: "Bearer " + LocalStorageService.getAccessToken(),
  };

  const methodType = data.get("id") ? "PUT" : "POST";
  const medicalInfo = {
    id: data.get("id") ? data.get("id") : null,
    decription: data.get("decription"),
    labName: data.get("labName"),
    documentType: "Lab",
    patientId: data.get("patientId"),
    doctorId: data.get("doctorId"),
  };

  const formData = new FormData();
  formData.append("file", data.get("labResultDocument"));
  formData.append("medicalInfo", JSON.stringify(medicalInfo));

  var config = {
    method: methodType,
    url: "/api/medical-document-upload",
    headers: headers,
    data: formData,
  };

  return await axios(config).then((response) => {
    return response.data;
  });
};

export const deleteDocument = async (documentId) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + LocalStorageService.getAccessToken(),
  };

  const methodType = "DELETE";
  const config = {
    method: methodType,
    url: "/api/medical-documents/" + documentId,
    headers: headers,
  };

  return await axios(config);
};

export const getDoctorDetail = async (emailId) => {
  const headers = {
    mode: "no-cors",
    Authorization: "Bearer " + LocalStorageService.getAccessToken(),
  };

  const config = {
    method: "get",
    url: "/api/find-doctor?emailId=" + emailId,
    headers: headers,
  };

  return await axios(config).then((response) => {
    return response.data;
  });
};

export const getPatientDetail = async (emailId) => {
  const headers = {
    mode: "no-cors",
    Authorization: "Bearer " + LocalStorageService.getAccessToken(),
  };

  const config = {
    method: "get",
    url: "/api/find-patient?emailId=" + emailId,
    headers: headers,
  };

  return await axios(config).then((response) => {
    return response.data;
  });
};

export const validateEmail = (mail) => {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    )
  ) {
    return true;
  }
  return false;
};

export const getDefaultPrescription = async () => {
  var payload = {
    method: "get",
    url: `/api/medical-document-retrival?docIdUser=medicalPrescription`,
    headers: {
      Authorization: "Bearer " + LocalStorageService.getAccessToken(),
      "Content-Type": "application/json",
    },
  };
  const response = await axios(payload).then((res) => {
    if (res) {
      return res;
    }
  });
  return response;
};
// http://localhost:8081/api/medical-document?docId=1&patId=13

export const getDocumentById = async (payload) => {
  const config = {
    method: "get",
    url:
      payload.patientId !== null
        ? "/api/medical-document?docId=" +
          payload.id +
          "&patId=" +
          payload.patientId
        : "/api/medical-document?docId=" + payload.id,
    headers: {
      mode: "no-cors",
      Authorization: "Bearer " + LocalStorageService.getAccessToken(),
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios(config).then((res) => {
    if (res) {
      return res;
    }
  });
  return response;
};
