sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
     /**
      * @param {typeof sap.ui.core.mvc.Controller} Controller
      */
      function (Controller, JSONModel) {
                "use strict";
        
                return Controller.extend("numenit.com.hack2buildgenai.controller.List", {
                    onInit: function () {
            
                            },
                    onPressLoadData:async function(){
                        this.getView().byId("reOrderTable").removeAllColumns();
                        var oMydata = new sap.ui.model.json.JSONModel();
                                oMydata.loadData("../mockdata/mockresult.json",false);
                        oMydata.attachRequestCompleted(function() {
                            console.log(JSON.stringify(oMydata.getData()));
                            sap.ui.getCore().setModel(oMydata);
                            var oTable = this.getView().byId("reOrderTable"); 

                            var aKeys = Object.keys(oMydata.getData().Analysis[0]);

                            aKeys.forEach(function(sKey) {
                                oTable.addColumn(new sap.ui.table.Column({
                                    label: new sap.m.Label({text: sKey}),
                                    template: new sap.m.Text().bindProperty("text", sKey),
                                    sortProperty: sKey,
                                    filterProperty: sKey
                                        }));
                                    });
                    
                            oTable.setModel(oMydata);
                            oTable.bindRows("/Analysis");
                            oTable.setVisible (true);
                    
                        }.bind(this));
                    },
            
                    onFileChange: function(oEvent) {
                        var oFileUploader = this.getView().byId("fileUploader");
                        if (!oFileUploader.getValue()) {
                            // Nenhum arquivo foi selecionado
                            return;
                            }

                        var file = oEvent.getParaneter("files") && oEvent.getParameter("files")[0];
                        if (file && window.FileReader) {
                            var reader = new FileReader();
                              reader.onload = function(e) {
                                var content = e.target.result;
                                var jsonData = JSON.parse(content);
                                var oJsonModel = new JSONModel(jsonData);
                                this.getView().setModel(oJsonModel, "teste");
                            }.bind(this);
                            reader.readAsText(file);
                       }
                   }
               });
          });