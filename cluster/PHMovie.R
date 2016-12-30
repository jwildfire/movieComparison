### Code modified from Sebastian Raschka's tutorial 
### located here: http://sebastianraschka.com/Articles/heatmaps_in_r.html

#########################################################
### A) Installing and loading required packages
#########################################################
library(googlesheets)
library(dplyr)
if (!require("gplots")) {
  install.packages("gplots", dependencies = TRUE)
  library(gplots)
}
if (!require("RColorBrewer")) {
  install.packages("RColorBrewer", dependencies = TRUE)
  library(RColorBrewer)
}


#########################################################
### B) Reading in data and transform it into matrix format
#########################################################
gdata <- gs_title("PHMovie")
data<-data.frame(gdata%>%gs_read(ws="Form responses 1"))
#data <- read.csv("/Users/jwildfire/Desktop/PHMovie/PHMovie.csv", comment.char="#")
rnames <- data[,2]                            # assign labels in column 1 to "rnames"
mat_data <- data.matrix(data[,3:ncol(data)])  # transform column 2-5 into a matrix
rownames(mat_data) <- rnames                  # assign row names


#########################################################
### C) Customizing and plotting the heat map
#########################################################

# creates a own color palette from red to green
my_palette <- colorRampPalette(c("red", "yellow", "green"))(n = 299)



# creates a 5 x 5 inch image
png("/Users/jwildfire/Desktop/PHMovie/PHMovies.png",    # create PNG for the heat map        
    width = 9*300,        # 5 x 300 pixels
    height = 5*300,
    res = 300,            # 300 pixels per inch
    pointsize = 8)        # smaller font size

heatmap.2(mat_data,
          cellnote = mat_data,  # same data set for cell labels
          notecol="black",      # change font color of cell labels to black
          density.info="none",  # turns off density plot inside color legend
          trace="none",         # turns off trace lines inside the heat map
          margins =c(12,9),     # widens margins around plot
          col=my_palette,       # use on color palette defined earlier
          dendrogram="both"      # only draw a row dendrogram
  )           

dev.off()               # close the PNG device