import React, { Component } from "react";
import Dropzone from "../DropZone/DropZone";
import Progress from "../Progress/Progress";
import * as APIS from "../../constants/apisUrl";
import fileIcon from "../../assets/file-icon.png";
import Axios from "axios";

import "./Upload.css";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      name: "",
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async onFilesAdded(file) {
    await this.setState({
      file: file[0],
    });
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const form = new FormData();
    form.set("foo", this.state.file);
    Axios.post(APIS.SALUDFOLDER + "documentos", form, {
      headers: { Authorization: localStorage.getItem("sessionToken") },
    })
      .then((res) => {
        var user = localStorage.getItem("user");
        const data = [
          { propName: "owner_id", value: user._id },
          { propName: "titulo", value: this.state.name },
        ];
        const headers = {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("sessionToken"),
        };
        Axios.patch(
          APIS.SALUDFOLDER + "documentos/" + res.data.newDocumento._id,
          data,
          { headers: headers }
        )
          .then((res2) => {
            const email = [{ email: user.email }];
            Axios.patch(
              APIS.SALUDFOLDER + "users/addDoc/" + res.data.newDocumento._id,
              email,
              { headers: headers }
            )
              .then((res3) => {
                console.log(res3);
                this.setState({ successfullUploaded: true, uploading: true });
              })
          })
      })
      .catch((err) => {
        console.log(err);
        this.setState({ successfullUploaded: false, uploading: false });
      });
    // const promises = [];
    // this.state.file.forEach((file) => {
    //   promises.push(this.sendRequest(file));
    // });
    // try {
    //   await Promise.all(promises);

    //   this.setState({ successfullUploaded: true, uploading: false });
    // } catch (e) {
    // Not Production ready! Do some error handling here instead...
    //   this.setState({ successfullUploaded: true, uploading: false });
    // }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100,
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);

      req.open("POST", "http://localhost:8000/upload");
      req.send(formData);
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0,
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ file: [], successfullUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={
            !this.state.file || this.state.uploading || this.state.name === ""
          }
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div className="Upload">
        <div className="Content">
          <Dropzone
            onFilesAdded={this.onFilesAdded}
            disabled={this.state.uploading || this.state.successfullUploaded}
          />
        </div>
        {this.state.file && (
          <div className="w-100">
            <div className="Filename">
              <img src={fileIcon} alt="Icono de archivo" className="Image" />

              <p>{this.state.file.name}</p>
            </div>
            {this.renderProgress(this.state.file)}
          </div>
        )}
        <div className="Name">
          <h5>Nombre del archivo:</h5>
          <input
            required
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            className="form-input Input"
          />
        </div>
        <div className="Actions">{this.renderActions()}</div>
      </div>
    );
  }
}

export default Upload;
