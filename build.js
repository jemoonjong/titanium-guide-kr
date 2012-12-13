var fs = require('fs'), path = require('path'), jade = require('jade'), md = require('node-markdown'), Class = require('neko').Class;
var format = new require('fomatto').Formatter();

/**
 * TitanGuide Generator
 */
var TitanGuide = Class(function(options) {
	this.options = {
		src : fs.realpathSync([__dirname, options.src].join('/')),
		out : fs.realpathSync([__dirname, options.out].join('/')),
		guide : fs.realpathSync([__dirname, options.guide].join('/')),
		index : fs.realpathSync([__dirname, options.index].join('/')),
		prefix : "/" + options.prefix
	};

	this.generate("2.1");
	this.generate("3.0");
}, {

	log : function() {
		console.log(format.apply(null, arguments));
	},

	makeIndex : function(version, out) {
		var jadefile = fs.readFileSync(this.options.index);
		var jadetemplate = jade.compile(jadefile);
		var file = fs.readFileSync(this.options.src + "/" + version + "/index.json").toString();
		var index = JSON.parse(file);
		index.prefix = this.options.prefix;
		index.path = this.options.prefix + "/site/" + version + "/guide";
		var html = jadetemplate(index);

		fs.writeFileSync(out + "/index.html", html);
		console.log("	>>>> making index Done! ");
	},

	loadFiles : function(dir, out) {

		var files = fs.readdirSync(dir);
		var jadefile = fs.readFileSync(this.options.guide);
		var jadetemplate = jade.compile(jadefile);
		var that = this;

		files.forEach(function(file, e) {
			var parsedHTML = that.toMarkdown(that.md(dir, file));
			var title = file.replace(".md", "");
			var html = jadetemplate({
				title : title.replace("_", " "),
				content : parsedHTML,
				description : 'Titanium Guide',
				prefix : that.options.prefix
			});

			fs.writeFileSync(out + "/" + file.replace(".md", ".html"), html);
			console.log("	>>>> making ", file, " Done!");
		});
	},

	toMarkdown : function(text) {
		text = md.Markdown(text).replace(/'/g, '&#39;');
		text = text.replace(/<blockquote>/g, '<aside>').replace(/<\/blockquote>/g, '</aside>');

		return text.replace(/<aside>\s+<p><strong>ES5/g, '<aside class="es5"><p><strong>ES5');
	},

	json : function(file) {
		try {
			var str = fs.readFileSync(file).toString();
			var s = str.replace(/\n|\s|\t/g, "");

			console.log(s);
			return JSON.parse(s);

		} catch (err) {
			return null;
		}
	},

	md : function(dir, article) {
		var file = [dir, article].join('/');
		return fs.readFileSync(file).toString();
	},

	renderGuide : function(version, src, out) {
		this.log('Rendering "{}" to "{}"...', version, out);
		this.makeIndex(version, out);
		this.loadFiles(src, out);
		this.log('    Done.');
	},

	generate : function(version) {
		var that = this;

		// 출력할 루트 폴더 생성
		path.exists(this.options.out, function(exists) {
			if (!exists) {
				fs.mkdirSync(this.options.out, '777');
			}
		});

		// 출력 버전 폴더
		var dir = this.options.out + "/" + version;
		path.exists(dir, function(exists) {
			if (!exists) {
				fs.mkdirSync(dir, '777');
			}
		});

		// 최종 가이드 폴더
		var src = this.options.src + "/" + version + "/guide";
		var out = this.options.out + "/" + version + "/guide";
		path.exists(out, function(exists) {
			if (!exists) {
				fs.mkdirSync(out, '777');
			}

			that.renderGuide(version, src, out);
		});

	}
});

exports.build = function(options) {
	options = options || {
		src : 'doc',
		out : 'site',
		prefix : 'titanium-guide-kr',
		guide : 'guide.jade',
		index : 'index.jade'
	};
	new TitanGuide(options);
}

exports.build();
