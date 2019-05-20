import React from "react";
import Link from "gatsby-link";
import get from "lodash/get";
import Helmet from "react-helmet";

import { rhythm } from "../../utils/typography";

const colorsByCat = cat => {
  switch (cat.toLowerCase()) {
    case "react":
      return {
        backgroundImage: "url('data:image/png;base64,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')",
        backgroundSize: "20px 20px",
        paddingLeft: "25px"
      };
    case "javascript":
      return {
        backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4wUSEiwgcwnvkAAAA2BJREFUSMftlktonFUUx//n3vvNTGYmnU7znGZMYkzsw+ii+AClShctiNiKLypUQUSoIC7EhdKlG0E3ghuLCi5atBSktiqWWqiiqI3WtDUaJsaakqbNOI/ON5l88z3OcTGdJGIdyEg2krs893B+957zP+deKk48jBVbBG0gwcoBhKBWLnptrQJWAauA/wPALOMsCkQEgFlE/mkXgESEuVnArxPu9BWPiDYMhNZ3GREQwfVkfNKd+N2tOJxM6M1D4b4eqxkAAce+sD8+UdYKLz7blk61MkuxxO99WDj5dcWusDC0Rsc6vXtnYuf2uNa07BqIQFiYAQEAZhw6VjpyvGxX2GjEogTgctbff7AwctZR9cDLSNHiXQiKkC8GX31fEaA1qp5+LLFpKHzq28rxL8v33hXrT1sLRVo+oI4pz3F5jiHobNM77ouvW6sHekPb7o4O9oVCFnEd0KxMBdEW1RIhIsxk/U9PlvPFIBZVwzdHjFmM3jxABG1JvWU4IiKOI+98UHjltdnDn5RmZn2lQEs8m0yRAEbjiV2J6Sv+j+cdz8O58epYpnr0hP3oA2u2b42FLKqVoflOZkG62+x7vv2pRxI93UYrMGNyynvz3fyho6Wg/pX4T6OCBR1t+pnH176+r+u5J5OD/ZZSqHpy+LPSb3+4NaU2AhBBEaiW0YW8yrU+qNkdR0BId5vdD6559aXO4Q1hCIpXeXzSrTmoBtFnZv2DR0oXL3mWIRHMzXPNblkEIFcIDnx09Y39uWwuUIpAlE5Z/WlLRETgVLlRkZXCyFnnrffzk1PemZ+dh3a0ZvP+6FiVFEXClOo0ridvHyh8fmqOCLlCcP+2eHtSZy643/wwrxRZhtZ3mkYAAJahks3C8t1P82fOOwELM5jltk0tN/VZlsbWO6OnR51cwR8554z+4hhNrifMYJE7boncujFSG6v65Rc2XkeFgq52k05ZFy/5th14PkQQDtGW4cjePcnuDsOC3h5roNf6s8AlO3A9+D4AxGPqntuje/cku9qNCECKipld/3YJRcjmg7FM9XLWVwrplLV5KJyIq8UxoGCXOXPBnZr2KvMSj6kbb7AG+0Mt4Xozk24EuCakJTpgxtKnZkFpCxoTgTAWXUgb/K2xr5OroOHvWwSBNNinvwB9aYD3EIc7wwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wNS0xOFQxODo0NDozMiswMDowMHkDM5AAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDUtMThUMTg6NDQ6MzIrMDA6MDAIXossAAAAAElFTkSuQmCC')",
        backgroundSize: "20px 20px",
        paddingLeft: "25px"
      };
    case "html":
      return {
        backgroundImage:
          "url('data:image/png;base64,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')",
        backgroundSize: "20px 20px",
        paddingLeft: "25px"
      };
    case "git":
      return {
        backgroundImage:
          "url('data:image/png;base64,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')",
        backgroundSize: "20px 20px",
        paddingLeft: "25px"
      };
    case "ethereum":
      return {
        backgroundImage:
          "url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/hAytodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Nzg4QTJBMjVEMDI1MTFFN0EwQUVDODc5QjYyQkFCMUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Nzg4QTJBMjZEMDI1MTFFN0EwQUVDODc5QjYyQkFCMUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3ODhBMkEyM0QwMjUxMUU3QTBBRUM4NzlCNjJCQUIxRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3ODhBMkEyNEQwMjUxMUU3QTBBRUM4NzlCNjJCQUIxRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/bAEMAAwICAgICAwICAgMDAwMEBgQEBAQECAYGBQYJCAoKCQgJCQoMDwwKCw4LCQkNEQ0ODxAQERAKDBITEhATDxAQEP/bAEMBAwMDBAMECAQECBALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIACAAIAMBEQACEQEDEQH/xAAaAAABBQEAAAAAAAAAAAAAAAAHAQQGCAkF/8QALRAAAQMCBQMCBQUAAAAAAAAAAQIDBAUGAAcRITESIlEUQSMyM2FiUnGBkZL/xAAaAQACAgMAAAAAAAAAAAAAAAADBQAEAgYH/8QALREAAQMBBgQFBQEAAAAAAAAAAQACAwQFERIhMUETIlGBFCMyYXFCcqGx0cH/2gAMAwEAAhEDEQA/ANO8RRcG97sjWbb79Xe6Vvn4UVon6jx4H7Dk/YYt0VK6smEY03+EOR4jbeohkbmicwaJKptXkJVXaO6puTsEl9kqIQ8AP8q04IHnF+27M8BKHxjkdp7Hcf6EKmm4rbjqETcJVZSKUlAK1qSlKQSVKOgAHJJ8Ymuiiqlm9m5S7juJXpZRkQYJLMNtncKGvc4TwCoj+gMb9ZNlPpoeYXOOv87ftK55w92WiD1g5tLsq92bmhdTLrEhaXmFq7JDCld7ZP3HGvBAPth9XWWKymMDtxkeh2KqxTcN+ILQCg1ylXNRoVw0SWiVAqDKX2HUkHqSfPgg6gj2IIxyieF9NI6GUXOBuKeNcHjE3RPiAoFJ4IIO2BLJVqzKyxsyXX3qbUWm7UrDhLsaoxmiabPQTspxobsq12UUbA66jjG62daNS2ISM8xm4Pqb8HcdL80tmiZiuOR67FDO1so7GolyMUepOs5gXZNkFDFIp7qkUmKoknqkyB3PBI7lJQAkAHXDiptSpmhMjPJiAzcfWftG1+xOaAyFjXYTzO6bd1dWi04Uikw6YExk+maS2RGjpYZBHIQ2nZCfA8aa6nU45vNJxZHPzz6m89zuU3aMIAT3Alko1f1mRr2oaoKiluawS7DeI+Rz9J/FXB/g+2LtBWOopcX0nUe39CHLGJG3bqG5FZRmwocq4a7GSK/VFLBQdD6SP1EhsEbdStlKI/Eexwxtu1fHOEMR5G/k9e2yDTQcMYnalFfCFWl//9k=')",
        backgroundSize: "20px 20px",
        paddingLeft: "25px"
      };
    case "reactnative":
      return {
        backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4wUSEjQPWsNKkAAABRFJREFUWMPt122MnFUVB/DffWZ2bSlGpcW2YEt4k120vmtQjAmioA1IiRaDQUKI9SVq1KiNRtQYFKIJYoUIapMC8aVFqEANKmqCpvj+wdLQHaOIhbJtWRbTUNK1O/NcP9yzs8N2ZxL7Ve+HfSZ3b8459/z/53/O5X99pb7/adXUbaqhlXg5DmOMvAe1kWrO+YzcIJ2Ml4TtP+FxsiPODwxgrCYleD2+hSXImMI23KTyd3Uu59sdms0z8VGcjwqN4tw67DQ9zarhI1z1CSvBAnwG+8Lo2/FNvBnb1N6NJoY0m5fjHrwKX8ZbsBodfELODUND87pqDoBnJV6GT2FXSUB6CFuxHhtIp4eND+EWXIcn4izcho9LaSnG/9sAlkYaH8Yshq08Tv406R+4JqBZT/4uqW0k9XBCC4tw/NEEMBTGp5+9nck6kgUKMQtcWS3luTam4jvcz8mgAA5GHo/t7rTqspVcgo/hqgh0vZR2Y6uxmtEutRbFJQ71c1Lpvybi9ivCeYN0DN6Arygl9ntsx18CjtdK6Ritesbui8L5U/2cHFmGYx1SRSm9n+IxjGEUyxRyLsWTAUFWKmYx9uLR+O7CK/ECXIADcs1oow8EYzVqUrUSF+IinIFVColaODWCXofdSplRyHpaZOY5OIC34tWRge9hq1Td6695vzp3YUp2taka8FxcoZTUMH4ehi7HO8LQ3dikcq26R91aNXKiuhoXxwWW4g6lPJcp+vEvbMDtOGQkSVEuS/B1RUA2YpNnJh6x6PjluA8/wEmRjTXkSdL5eFdJm80c/hXDJyqC9OsI/iKcJ+dJKZ2B9+PSCOAqPN2Uc5LSJ/FGXCHnX0gpW7REYPmzYHyO7wRptSIyiwOCCxi+FPfjBlwbUH0bTwbTWqEf2/ENPC75WiWlEyLFN+A+STaSepvHHUGyneR7w9g7e5yLFF8cv+/C34JfW1FsFYHqxN5GrJUtruJmdRBpvlXHN5tVmnrwueDXfDZTl/wZudJu78WP8eHAK2nVhVizt/230hdWh/nbsb/H7B7cGb/X4HRFBS/pkrRwrSFbiyuxBU/NkPA4pZGcp7TfW5RWuixIuCVIeCbWyPWkVJ0Taa/xI5XtasuDhNuVLnpZuVRnr9R4MT6I9+CH+DwOJrumqZqUMnyfUobtwPIZfEApq2mlDDdKvirPKcPcSVLzi3HrCxUJ34bv4/lKS38a12MzpkoZzqxWHQilU7BWKaGXBo73K2r4JizHZxUhmsG9gVMU9u/GnyNbZ8VlfhcQ3YO9vRPSPFLcnYaW4yeRykcC1yU4QamASbPdcDj2JhTp3m9WOU/G2zAxWIpn1mg1Q5gFeJ7SZO4kD5MWKvPhrdiBq4PNn8Mr8F48SJ4itYOQ1wW8E3OdM7gbvjBu9hgYqQ6TD+A3ioq9Dq+JgM7CF/Bb8kEjVTtsjMclF/dzMmgeODYwPtjdGYns5LxZSiuU5gMbyFtIc6ffQ5GhhUcTwHRkaM40mWf+jEeGGnjCrAD1rgUKz6b6ORkUwD5FOk/Fjp454TjJR5Ry/Y5CxC+RVuB6rTwpd2MZVURs31EEkB8lPahow0NS1cHZyixwYnGaNxWY0sMKEc/BzVJ6IG5/Jf5AHu/3BJl/d2b2Kw+Tm5Sppo40/xI3knd2055zkqpVSrc8N/YbcfN12NHvdTT4adaeornwJOXB0VHeB/981vjdPZ+Rm6TTFBGCP0r29E5A/19z138AZiOnoVrMiXQAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDUtMThUMTg6NTI6MTUrMDA6MDAyEaXkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTA1LTE4VDE4OjUyOjE1KzAwOjAwQ0wdWAAAAABJRU5ErkJggg==')",
        backgroundSize: "20px 20px",
        paddingLeft: "25px"
      };
    case "programming":
      return {
        backgroundImage:
          "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAC91BMVEUAAAB1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1vol1von///867QQqAAAA+3RSTlMAAAQpbK3a8v2tbAM3mN/7NwMaiurqiho2wv7CNkHZ2UE22dk2GsLrwMv7whoCipEEVvqKAjjp+EuS6TgDl9UYE8+XAyre//X8mkT13ips+9tWpv37Vof9plbb+2yt3ENC7t0fDsZCQ9yt2dxDLMemADrwxyxD3Nny3UMtyP1ie8gtQ93y/eNDJsrkJwm9yiZD4/3hPijNsQQx680oPuHZPTDMbW/MMD3Z1zwwzOowBLLMMDzX1jpK8rsIKOXySjrW1E+s/nlj/v6sT9T/8/3wOQGn88UNIN6FWPuK9ksGnhrC+cnB7sIaNsLCNorq6ooaAzeY3/s3AwQpbHjmCCwAAAABYktHRPw8DqN/AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4wUSEwU1W1D+pwAAAhJJREFUOMtjYIACRiZmFlY2dg4OdjZOLmYmRgZUwMjNw8vH/xsK+Pl4BQSRlTAyCgmL/EYBomLijIwIeQlJqd9oQEpaBqaCkVFW7jcWIK8AUcHIqKj0GytQVgGrYFRVQxFW19DUgjK1dYAKGHX1UPXpGxgawdjGJowMjKZmKPLmFoyWcI6VNSODjS2qAXb2Do4InpMzg4srhOnm7gGmPRm9vH97uLtBRH18Gfz8IcyAwKBgIBUSyhj2OzwiMgoiGh3DEAthxcUzJiQC6aTklNTfiWmM6RkQ8UyGLDCdncOYmwdi5BcUFv3+XVzCWFoGlihnqABRlVWM1TUgRm0dYz2IbmhkbGoGMVoYWoFkWztjRydYQ1d3Ty+Y0dfPOGEikJ4EVjB5CuPUaWDx6TNmzgIzZs9hnDsPrABsxfwFjAsXgRiLGZeA5ZcuY1y+AmIFxJErVzGuXvP799p16zeAuBs3MW7eAnUk1JtbtzFu3/F7567de4CcvfsY9x+AeRMWUAcPHT7y+yjjseNA9omTp07DAwoW1GfOnvt9/sLFS2DOuctn4EGNHFlXrl67jhp1wMhCju4bjDdvociDopvR5DaMe+fuvfuoBuiZgJLUg4dQ7qPHT56iyD97zkhMoiWY7EEqXrzEzDivXiNnLaE3b1Hl373/wIiSOz9++vwFnnm/fvn87TtG/v7xE579f/38AZcGADVgls4jveZbAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTA1LTE4VDE5OjA1OjUzKzAwOjAwm5bwmgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wNS0xOFQxOTowNTo1MyswMDowMOrLSCYAAAAASUVORK5CYII=')",
        backgroundSize: "20px 20px",
        paddingLeft: "25px"
      };
    case "typescript":
      return {
        backgroundImage:
          "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4wUSEjYpuvit7wAAA11JREFUWMPtl81rXFUYxn/n3Dtz5ytpTGbiTapBNNUakJTY+oFoXCmKYt20FBdmYTYuArpJ1X+gQnYFF4JiERTjwkqRWHBRW6Qu0tRSTUolcdoOSfMxmWucr3vnzj0u7nScsSaZyEhdzIFz4XJe3vc5z3ue53AE704r7uCQd7J4C0ALQAtAC0ALwP8CgL7lqreDe0oIEDX/SoHaYn07ACFd8vi9UWLBfyZJVT4K8JRiZjHPatb1k0oYMCPs64kQDUrSeZeZxTwLaRuvIQAK4lGdDw/28UCnsSkRCn9TJU9x6PMFvpm1iIU1jg6bjO5PkIjpiAqR1y2HY2dv8tH0Gm5Nwk0ZEEBQk2hSoDXAvi59fkcPxBl/xkSXgrJSlMoKQ5Pcd1eQ95/fzXXLYeqKBZV4fbPq6wWX8dMp2gwNpcDQBW8/dTf9XQb5ksfEuWWSGRspBB6Ki0t52iI6hx7pRJeCoutx7PubnPktyysP7+L1oS6+nv2dudWCj3g7BnKOx+Sl9SrXUUPy2mAn/V0Gjqs4+UuGi6lcdScAvR1BElE/5XLW5cT0Gsl1mwupHJOXM1xaKlAoeXWHcWsZSuFPTdQVqlu7NYWgWFJs2GUAetoCjBxIEG8PkrXL/JjMUnC925TQPB+otO3bqxsABDXBe8+aTI3s4a2nTfo6jXpZNh1ApVXHz69wctbCU/7B3L87wsQL9zA1sofRx+KEdVEHpLkABCxtlHjjq2scPZ1ibqVIWSmkgIHuEMdf6vMVov3Vh+ZbsYB0zmXi7DLPffIrY6ducGExj1dR0ptPdLOvJ1x12aa3QAIxw0+bshw+OL/CwU/nObPwBwCJqM5Qb+S/YcBsDzA+bPLZ4fvZ2x2q7jJl2VxNF6txkRp713dcZZMhBbwzbDL2ZDcAve0BPp5e45rlMNgT5tWBDgBsVzGftpsPwPNg8nKGFx/cRX+XwaO9EYZe7sNVCl2Kqvy/m9/gXDJbdcMdtcAuK1xPUXA9lPqbqAX8kMxy5IsFvvw5QzrvooCAFCgFazmXEzNpxk7dwCqUq4YkGn2calIwaIbpCGk4ZcVPS3myjnd7oFKEApK9iTAPxQ1ihkbO8ZhbLXBlpYjtqjo3bBiAz3Otg4jGYysM1V5Ct8bOzsB2Rf9F7J/1gENvZRvJuAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wNS0xOFQxODo1NDo0MSswMDowMIOg/9QAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDUtMThUMTg6NTQ6NDErMDA6MDDy/UdoAAAAAElFTkSuQmCC')",
        backgroundSize: "20px 20px",
        paddingLeft: "25px"
      };
    case "markdown":
      return {
        backgroundImage:
          "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH4wUSEwMAW7mdAgAAAtFJREFUWMPtlttuE1cUhr+1Z89MnNgONJBAAgi1UKFILaoQEjeIG54ib8FDcM1b5LqvUBUJcZCglWghDSJKSDBJTOJDHI/t2asXYxMfJjYIybnJfzWzzutfa/ZsOMUpThhy/+HjaYR7RmRhnImd6ibKHzYM/UeX52aWpnOToY6ra6BUqUUbn4rLdjo7ubR47VI4EfiMs4B6oxmWDw6XrPVM6BmD03GlBwU8Y7CeCW1H0G/QXS3fqO+3GxbDdgtDC7/OGsK2dG1f2ShrTwABfp4R5qYS6X5deb2juL4ufjorzOcSm62K8m4vneEvBSjgmyR4NkhkF7NQeafs10EEVGEhL9xZMGR82sHh393eAhSYzwmL549KX93TVCbMADWaRFCFHzLCrXmD7yXv2QBuzwsZv203jH5Nfx5ZQP+gfjwj3DgneAZ+u2CYm5KRyb8F9jiFU6i3YMqHm7OGXKBcnxFihUoD8uGQ5dJ0hbYduv3SGRCIFf7+5ChFkA3hl1kh8OBDWVkputTkgQf5AHIh+N6R3PcSWT6Ayb6Wj2VAgO0a1AuOu1cM1kC1AS8+KucnB7tXhXwo3L0iZKwQ2qPZXz0jXMx6tBw83XSslY4oGroDAvz3WVkpKs7Bq4Jj+0CRlPZFYLemvC0qGR+CrsiBgakA3qd81pYRiNuJKw1h5fPo7Xuzq2QD5eacfEmkwEpReVlwxPo1O9DHQqUBfxWUZjwyP7EmBb/fS5gSgfWy8mzT0XSDoxtgoENvx1nbRQz0fswZLEAUJ7POBgYj8GTDUWuSOjrb7dh0CVUTNqH+oDE4bwH2DuH1TjLL/frgMSxAOYI/1xNF5yRNQw8DUQueb7men0i/nwh8rCpbVR1GRLKUh9rD6rEFDCRhNL7XpqOzrdhFsXOhb72xXkgaztGKXWRL1dryP6sfTuRKVqrWlm0UNR+sbhR+P6lL6ThznuIUqfgfLjwu2izF/5QAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDUtMThUMTk6MDM6MDArMDA6MDDvgJQkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTA1LTE4VDE5OjAzOjAwKzAwOjAwnt0smAAAAABJRU5ErkJggg==')",
        backgroundSize: "20px 20px",
        paddingLeft: "25px"
      };
    case "random":
      return {
        backgroundImage:
          "url('data:image/png;base64,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')",
        backgroundSize: "20px 20px",
        paddingLeft: "25px"
      };
    case "graphql":
      return {
        backgroundImage:
          "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4wUTAzovWnbp9AAABHtJREFUWMOV13mI1VUUB/DP7zdTlq3QRlmRZZGUUNhAFO3SBi0E1h8t0EaQpaWi/dEC0ZRoUVa0/BGVLX/MRGVBEZptUIT1Ryu0iAZOoFnkkubTmdcf91zmznOevbnw491737nfs95zzq10OAZ6+vO0QhNn487YexqfFP+ZsHJ6R7hVJ0Rre/pUibQLg5iGD1AHyRAuwvKCpiMh6v8jGOjpz8xLgWfG2UZ8deyNUKqwWtvR3YHJM2hXaAoHjGLB/QtrdIcVmhmnnTWqURjVkh8zs65ifRCewHXYgT2CJs9fwd34M3Cq7I5iPRR4u7ggzweDqMuwPyvMxR84F71Bsya+ITyC87EecwrmGWeoRZgRkyzZOJyOk4oDlwaTRfEdhclYozk0samaiNU4EUfiMTwae5cUCp0U2ONiXeUYqGPjOCwNQngV++EKvIuzQpDLcRWmqWpVsuYd0g24HPPwDJ7Ee3gbW8Jt8D2uxCrU1UBPfxZgaQDsDKFq/Ibr8VkRiL/gmwDpKtz2Fk7BCRETpFzxCo4OHjlA3wnF6sx8HKYUbskBuDyYj4/AmYVjwsdiLwfU3PhvVqzH41Msi/VQ4fIp2RVZ0+3hMwUg/Bq/W3EYHsaCMF93i1arIhB7g3ZrC0aJvTp41uUtmI8NYdZuKbU+Zfiu92IzHirMrmXei00hqDj7VGB1B/aG4DXC3BW+wiSsQ5903Roh9VTcjNn4x3BuKDXriv/m4CacFvuNwOoL7EnBq8ouKAE2hgbrCgFhMb7GEkVymbByepnhcr5YEgwWt2CsC+yNpQKlC3LgVcX+dlyNMw3n+t3Vj7JWnIFrAiOfq1p4qdvk6GzefaXU+zo+16bSFfOcQb/Aa3g8MErMEefaaZPv9zwpoue3AxllZO3uwaHF2a7RiOtRSmaNbdgb9+EBrDV87UatbMVeM2jXxtl7A2ubFvcN9PSPWozgXyyUAmdh7A3qfGTaRYGxKDB34ZX7gRzZB8afF+N46eo1sGcpQCeNRpi8IbVtL0gJqQ4efwfPZlmMpuJ9HCKl1PVYEWA7Jqyc3on/S/PmWFghZcVTY/2zVCW/1lKMlkm93mDhx6fxklQVx+KCbIHNuBEzpCKXC9oKXIA6B9aeOLZwRxbqVtyCvcbIPI+G4XpRZs+JwbORXdDAtyFErlp1mG423pTu876FhdqNbini/wotn8URhSB18GpkC+QxR8rTJ8f6NamkvigF5czwX4Vm61X8vadPU5XfBftIt+d2PC9dwxuC+XehVDJ3RHQ+uJfUVGzGj7F3GZ4LLRbgwdAwayv8KxjcFcx/korSl7E/OSz4jXQlKzTLrjh3w9m8ZbfTHVI/LBWU23C44fqwGD/gZallnyF1Qq04Wdncg465LT9Yqg3Xxl4uLs1g8ATuDwu1Mh61LW/7NNvNw2QIH+Mcw73fHvhIasu7gn5nCdDuYdL2ZZQPhCDNAMzXdlOheR5bCmF3tuK0Gx09Tgtr7O5xeiE+zDSdvo7/93HaokXuepbjPLwR33nBvDbGjPkfe5dzjmrNteIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDUtMTlUMDM6NTg6NDctMDc6MDBlbD6AAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTA1LTE5VDAzOjU4OjQ3LTA3OjAwFDGGPAAAAABJRU5ErkJggg==')",
        backgroundSize: "20px 20px",
        paddingLeft: "25px"
      };
    case "redux":
      return {
        backgroundImage:
          "url('data:image/png;base64,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')",
        backgroundSize: "20px 20px",
        paddingLeft: "25px"
      };
    default:
      return {
        backgroundColor: "#ce3175",
        color: "#fff"
      };
  }
};

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const author = get(this.props, "data.site.siteMetadata.author");
    const siteUrl = get(this.props, "data.site.siteMetadata.siteUrl");
    const siteDescription = get(
      this,
      "props.data.site.siteMetadata.description"
    );
    const posts = get(this, "props.data.allMarkdownRemark.edges");
    const image = "https://starflow.com/images/Maksim_Ivanov.jpg";

    return (
      <div>
        <Helmet title={siteTitle}>
          <link rel="canonical" href={`https://maksimivanov.com/posts/`} />
          <meta name="description" content={siteDescription} />
          <meta property="og:site_name" content={author} />
          <meta property="og:type" content="blog" />
          <meta property="og:url" content={`https://maksimivanov.com/posts`} />
          <meta property="og:image" content={image} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="satansdeer" />
          <meta name="twitter:title" content="Maksim Ivanov" />
          <meta name="twitter:creator" content="satansdeer" />
          <meta name="twitter:description" content={siteDescription} />
        </Helmet>
        {posts.map(({ node }) => {
          if (!node.frontmatter.title) {
            return;
          }
          const title = get(node, "frontmatter.title") || node.fields.slug;
          return (
            <div
              key={node.fields.slug}
              style={{ borderBottom: "1px solid #ccc", marginBottom: "30px" }}
            >
              <Link style={{ boxShadow: "none" }} to={node.fields.slug}>
                <h2
                  style={{
                    marginBottom: rhythm(1 / 2),
                    fontSize: "30px"
                  }}
                >
                  {title}
                </h2>
                <small
                  style={{
                    marginBottom: rhythm(1),
                    display: "block",
                    color: "#aaa"
                  }}
                >
                  {node.frontmatter.date}
                  {" · "}
                  <span
                    style={{
                      padding: "5px 10px",
                      paddingLeft: "10px",
                      color: "#222",
                      fontWeight: 600,
                      backgroundRepeat: "no-repeat",
                      backgroundPositionY: "center",
                      ...colorsByCat(node.frontmatter.categories)
                    }}
                  >
                    {node.frontmatter.categories}
                  </span>
                </small>
                {/* {node.frontmatter.image && (
                  <Img
                    sizes={node.frontmatter.image.childImageSharp.sizes}
                    style={{ marginBottom: rhythm(1), borderRadius: 6 }}
                  />
                )} */}
              </Link>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            categories
            image {
              childImageSharp {
                sizes(maxWidth: 800) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
