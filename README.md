#JustBnW
=======

Black and White your images with six filters.

*Just Open it in Browser.*

> You may need a local server to be able to upload inorder to prevent cross origin issue (for IE)

```html
<ul>
<li>Browse for your image.</li>
<li>Apply one of the filters. Each filter is independent of another.</li>
<li>Manually adjust the Brightness and Contrast.</li>
<ul>Click Save.
   <li>In Chrome, you image is downloaded automatically.</li>
   <li>In other desktop browsers, the image opens seperately. Right Click and save Image.</li>
   <li>In Firefox OS, the image is saved to gallery.</li>
</ul>
</ul>
```

## Changelog
-----------

1. vf 1.0

-----------

* Basic implementations with lots of rgb objects created *

-----------

2. vf 1.2

-----------

- Same filters but static objects removed and one Filter function.
- The above resulted faster when <a href="http://jsperf.com/closure-prototype-static-performance/22">tested</a>
- The events are directly attached to 'id' instead of class traversal.
- Processing is done directly on pixels without passing and tossing objects here and there.
- Processing is threading based, number of threads vary from 3 to 5.

-----------

Contact : princeofpersiaa3.ag@gmail.com
